import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        marginBottom: 20,
        alignContent: 'center'
    },
    appBarSpacer: {
        flexGrow: 1
    },
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        fontSize: 14,
    },
    cardPadding: {
        padding: 4,
        paddingBottom: '0 !important'
    },
    cardMargin: {
        marginRight: 10
    },
    cardWidth: {
        width: '70px'
    }
}));

function AppBarComponent({score, bestScore}) {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar} disableGutters>
            <Typography variant="h4" className={classes.pos} color="textSecondary">
                2048
            </Typography>
            <div className={classes.appBarSpacer} />
            <Card className={classes.cardMargin + ' ' + classes.cardWidth}>
                <CardContent className={classes.cardPadding}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                       Score
                    </Typography>
                    <Typography variant="h5" className={classes.pos} color="textSecondary">
                        {score}
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.cardWidth}>
                <CardContent className={classes.cardPadding}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Best
                    </Typography>
                    <Typography variant="h5" className={classes.pos} color="textSecondary">
                        {bestScore}
                    </Typography>
                </CardContent>
            </Card>
        </Toolbar>
    )
}

export default AppBarComponent;
