import React from "react";
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'absolute',
    },
}));

function LoaderButtonComponent({children, loading, ...rest}) {
    const classes = useStyles();
    return (
        <Button {...rest}>
            {children}
            {loading && <CircularProgress className={classes.loading} size={20} />}
        </Button>
    );
}

export default LoaderButtonComponent;
