import React, {useState, useRef} from 'react';
import { useInput } from '../../hooks/input-hook';
import { makeStyles } from '@material-ui/core/styles';
import {publicClient} from '../../utilities/Apollo';
import AUTHENTICATE_USER from "../../query/User/loginUser";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LoaderButton from "../../components/LoaderButton";
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    center: {
        textAlign: 'center',
        display: 'block'
    }
}));
const requiredField = 'This field is required';
function Login({onClose, loadUser}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    const classes = useStyles();

    const signIn = async (evt) => {
        evt.preventDefault();

        setLoading(true);
        setError(null);
        await publicClient.mutate({mutation: AUTHENTICATE_USER, variables: {email: email, password: password}})
            .then(response => onSignInSuccess(response))
            .catch(error => onSignInError(error));
    };

    const onSignInSuccess = async (response) => {
        let token = response.data.authenticateUserWithPassword.token;
        if (token) {
            await localStorage.setItem('token', token);
        }
        await loadUser();
        setLoading(false);
        resetEmail();
        resetPassword();
        onClose();
    };

    const onSignInError = (error) => {
        setLoading(false);
        setError(error.graphQLErrors[0].message);
    };

    const userRefForm = useRef();
    return (
                <Card elevation={0}>
                    <CardContent>
                        <ValidatorForm
                            ref={userRefForm}
                            onSubmit={signIn}
                            onError={errors => console.log(errors)}
                        >
                        {error && <Alert severity="error">{error}</Alert>}
                            <Grid container spacing={3} justify="center">
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="degree"
                                        required
                                        label={'Email'}
                                        name="email"
                                        {...bindEmail}
                                        autoComplete="email"
                                        autoFocus
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
                                        required
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
                                Login
                            </LoaderButton>
                        </ValidatorForm>
                    </CardContent>
                </Card>
    );
}

export default Login;
