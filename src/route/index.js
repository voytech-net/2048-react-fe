import React from "react";
import {Route, Switch } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import GameRoute from "./Game";
import Register from './Register'
import { authenticatedPage } from './authenticatedPage'

const Routing = () => {

    return (
        <>
            <Switch>
                <Route exact path='/' component={Leaderboard} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/game' component={authenticatedPage(GameRoute)} />
            </Switch>
        </>
    );
};

export default Routing;
