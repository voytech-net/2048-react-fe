import React, {useState} from "react";
import Game from "../../components/Game";
import AppBarComponent from "../../components/Header";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import GameOver from "../../components/GameOver";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowBack} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    mt10: {
        marginTop: 10
    },
    backArrow: {
        marginRight: 10
    }
}));

function GameRoute() {
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(localStorage.getItem("Best") || 0);
    const [game, setGame] = useState(0);
    const [status, setStatus] = useState("running");
    const classes = useStyles();

    const resetGame = () => {
        setScore(0);
        setGame(game + 1);
        setStatus("running");
    };

    const cacheBest = score => {
        localStorage.setItem("Best", score);
        setBest(score);
    };

    return (
        <div className="game-app">
            <GameOver open={status === 'won' || status === 'fail'} status={status} score={score} reset={resetGame} />
            <AppBarComponent score={score} bestScore={best} />
            <Game
                key={game}
                score={score}
                setScore={setScore}
                best={best}
                setBest={cacheBest}
                status={status}
                setStatus={setStatus}
            />
            <div className={classes.mt10}>
                <Button color="primary" onClick={resetGame}>Start new game</Button>
                <Button color="primary" component={Link} to="/">
                    <ArrowBack className={classes.backArrow} /> Back to leaderboard
                </Button>
            </div>
        </div>
    );
}

export default GameRoute;
