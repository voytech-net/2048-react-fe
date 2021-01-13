import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    marginOnSides: {
        marginTop: 20,
        marginBottom: 20
    }
}));

function BackButtons({reset}) {
    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={reset} className={classes.marginOnSides}>Try again?</Button>
            <div>
                <Button variant="contained" component={Link} to="/">
                    <ArrowBack className={classes.backArrow} /> Back to leaderboard
                </Button>
            </div>
        </div>
    )
}

function GameOver({reset, open, status}) {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={open}>
            {status === 'won' && <div>
                <Typography variant="h2" component="h2">
                    You have won!
                </Typography>
                <BackButtons reset={reset}/>
            </div>}
            {status === 'fail' && <div>
                <Typography variant="h2" component="h2">
                    There are no more moves to try :(
                </Typography>
                <BackButtons reset={reset}/>
            </div>}
        </Backdrop>
    )
}

export default GameOver;
