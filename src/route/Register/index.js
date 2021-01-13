import React, {useState, useRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useInput} from "../../hooks/input-hook";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LoaderButton from "../../components/LoaderButton";
import {publicClient} from "../../utilities/Apollo";
import AUTHENTICATE_USER from "../../query/User/loginUser";
import { ArrowBack } from '@material-ui/icons';
import CREATE_USER from "../../query/User/createUser";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
const requiredField = 'This field is required';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#f3f7fc'
    },
    primaryColor: {
        color: theme.palette.primary.main
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    buttonMargin: {
        marginLeft: theme.spacing(2)
    },
    center: {
        textAlign: 'center'
    },
    newGame: {
        marginRight: 10
    },
    loggedUser: {
        marginBottom: 10
    },
    backButton: {
        marginTop: 20
    },
    backArrow: {
        marginRight: 10
    }
}));

function Register() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    const { value:name, bind:bindName, reset:resetName } = useInput('');
    const userRefForm = useRef();

    const createUser = async() => {
        setLoading(true);
        setError(null);
        await publicClient.mutate({mutation: CREATE_USER, variables: {name: name, email: email, password: password}})
            .then(response => onCreateSuccess(response))
            .catch(error => onCreateError(error));
    }

    const onCreateSuccess = async (response) => {
        await loginUser();
    };

    const onCreateError = (error) => {
        setLoading(false);
        setError(error.graphQLErrors[0].message);
    };

    const loginUser = async () => {
        await publicClient.mutate({mutation: AUTHENTICATE_USER, variables: {email: email, password: password}})
            .then(response => onSignInSuccess(response))
            .catch(error => onSignInError(error));
    };

    const onSignInSuccess = async (response) => {
        let token = response.data.authenticateUserWithPassword.token;
        if (token) {
            await localStorage.setItem('token', token);
        }
        setLoading(false);
        resetEmail();
        resetPassword();
        resetName();
        history.push('/');
    };

    const onSignInError = (error) => {
        setLoading(false);
        setError(error.graphQLErrors[0].message);
    };

    return (
        <div>
            <CssBaseline />
            <main>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h2" component="h2" align={'center'}>
                                <span>2048</span>
                            </Typography>
                            <Typography variant="h4" component="h2" align={'center'}>
                                <span>Sign up for a free account</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="center">
                        {error && <Alert severity="error">{error}</Alert>}
                        <Grid item xs={12} sm={6}>
                            <ValidatorForm
                                ref={userRefForm}
                                onSubmit={createUser}
                                onError={errors => console.log(errors)}
                            >
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={12}>
                                        <TextValidator
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            label={'Name'}
                                            name="name"
                                            {...bindName}
                                            autoFocus
                                            validators={['required']}
                                            errorMessages={[requiredField]}
                                            helperText={" "}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            label={'Email'}
                                            name="email"
                                            {...bindEmail}
                                            autoComplete="email"
                                            validators={['required', 'isEmail']}
                                            errorMessages={[requiredField, 'Not a valid email']}
                                            helperText={" "}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            label={'Password'}
                                            name="password"
                                            {...bindPassword}
                                            autoFocus
                                            validators={['required']}
                                            errorMessages={[requiredField]}
                                            helperText={" "}
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                </Grid>
                                <LoaderButton
                                    type="submit"
                                    disabled={loading}
                                    loading={loading}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Register
                                </LoaderButton>
                            </ValidatorForm>
                            <Grid item xs={12} className={classes.backButton}>
                                <Typography variant="body1">
                                    <Button color="primary" component={Link} to="/">
                                       <ArrowBack className={classes.backArrow} /> Back to leaderboard
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>

    )
}

export default Register;
