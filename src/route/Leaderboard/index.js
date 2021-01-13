import React, {useState, useEffect} from 'react';
import {publicClient, client} from '../../utilities/Apollo';
import GET_SCORES from "../../query/Score/getScores";
import Loader from '../../components/Loader'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Login from '../../components/Login'
import {Link} from "react-router-dom";
import GET_CURRENT from "../../query/User/getCurrent";
import UNAUTHENTICATE_USER from "../../query/User/logoutUser";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { yellow, brown, grey } from '@material-ui/core/colors';

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
    restPlaces: {
        paddingLeft: 8,
        display: 'block'
    },
    mt10: {
        marginTop: 10
    }
}));

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To login to this website, please enter your email address and password here.
                </DialogContentText>
                <Login onClose={handleClose} loadUser={props.loadUser} />
            </DialogContent>
        </Dialog>
    );
}

function GuestUserFunctions({handleClickOpen}) {
    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.newGame}>
                Login
            </Button>
            <Button color="secondary" variant="contained" component={Link} to="/register">
               Register
            </Button>
            <div className={classes.mt10}>
                Login or register to start a new game
            </div>
        </div>
    )
}

function LoggedUserFunctions({user, logout}) {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="body1" component="p" className={classes.loggedUser}>
                <span>Logged in as: <strong>{user.name}</strong></span>
            </Typography>
            <Button color="primary" variant="contained" component={Link} to="/game" className={classes.newGame}>
                Start a new game
            </Button>
            <Button color="secondary" variant="contained" onClick={logout}>
                Logout
            </Button>
        </div>
    )
}

function ActionButtons({user, logout, loadUser}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.center}>
                    {!user && <GuestUserFunctions handleClickOpen={handleClickOpen} /> }
                    <SimpleDialog open={open} onClose={handleClose} loadUser={loadUser} />
                    {user && <LoggedUserFunctions user={user} logout={logout} /> }
                </Grid>
            </Grid>
        </Container>
    )
}

function Scores({scores}) {
    const classes = useStyles();

    const showPlace = (place) => {
      if (place > 3) {
          return <span className={classes.restPlaces}>{place}</span>;
      }

      let color;
      switch (place) {
          case 3:
              color = brown[300];
              break;
          case 2:
              color = grey[500];
              break;
          case 1:
          default:
              color = yellow[500];
              break;
      }

      return (
              <EmojiEventsIcon style={{ color: color }} />
          )
    };

    const formatThousands = (item) => {
        if (item) {
            return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return 0;
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h2" component="h2" align={'center'}>
                        <span>2048</span>
                    </Typography>
                    <Typography variant="h4" component="h2" align={'center'}>
                        <span>Leaderboard</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                                {scores.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="td" scope="row">
                                            {showPlace(index + 1)}
                                        </TableCell>
                                        <TableCell component="td" scope="row">
                                            {row.player.name}
                                        </TableCell>
                                        <TableCell component="td" scope="row" align={'right'}>
                                            {formatThousands(row.score)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )
}

function Leaderboard() {

    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await publicClient.query({query: GET_SCORES})
                .then(response => onDataSuccess(response))
                .catch(error => onDataError(error));
        }
        fetchData();
    }, []);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await client.query({query: GET_CURRENT})
                .then(response => onGetCurrentUserSuccess(response))
                .catch(error => onGetCurrentError(error));
        }
    }

    const onGetCurrentUserSuccess = (response) => {
        if (response.errors) {
            return onGetCurrentError(response.errors);
        }
        setUser(response.data.authenticatedUser);
    };

    const onGetCurrentError = (error) => {
        console.log(error);
        setLoading(false);
    };

    const onDataSuccess = async (response) => {
        setScores(response.data.allScores);
        await loadUser();
        setLoading(false);
    };

    const onDataError = (error) => {
        setLoading(false);
        console.log(error);
    };

    const logoutUser = async () => {
        setLoading(true);
        await client.query({query: UNAUTHENTICATE_USER})
            .then(response => onLogout(response))
            .catch(error => onLogout(error));
    };

    const onLogout = async (response) => {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
    };

    return (
        <div>
            <CssBaseline />
            <main>
                {loading && <Loader />}
                {!loading && <Scores scores={scores} user={user} /> }
                <ActionButtons user={user} logout={logoutUser} loadUser={loadUser} />
            </main>
        </div>

    )
}

export default Leaderboard;
