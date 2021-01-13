import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './route';

import "./style/game.css";
function App() {

    return (
        <div>
            <Router>
                <AppRouter />
            </Router>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
