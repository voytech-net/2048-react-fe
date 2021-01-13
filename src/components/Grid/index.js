import React, { useEffect, useState } from "react";
import Row from "./../Row";
import {client} from "../../utilities/Apollo";
import PROCESS_GAME from "../../query/Game/processGame";
import Loader from '../../components/Loader'

function Grid(props) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleKeyDown = async (e) => {
            e.preventDefault();

            switch (e.key) {
                case "ArrowUp":
                    await processGame(props.grid, props.score, 'Up')
                    break;
                case "ArrowRight":
                    await processGame(props.grid, props.score, 'Right')
                    break;
                case "ArrowDown":
                    await processGame(props.grid, props.score, 'Down')
                    break;
                case "ArrowLeft":
                    await processGame(props.grid, props.score, 'Left')
                    break;
                default:
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const processGame = async (grid, score, direction) => {
        setLoading(true);
        await client.mutate({mutation: PROCESS_GAME, variables: {state: grid, score:score, direction:direction}})
            .then(response => onDataSuccess(response))
            .catch(error => onDataError(error));
        };

    const onDataSuccess = (response) => {
        const processGame = response.data.processGame;
        props.setGridState(processGame.state);
        props.setScore(processGame.score);
        setLoading(false);
        if (processGame.score > props.best) {
            props.setBest(processGame.score);
        }

        if (processGame.finished && processGame.score >= 2048) {
            props.setStatus('won');
        }

        if (processGame.finished && processGame.score < 2048) {
            props.setStatus('fail');
        }
    };

    const onDataError = (error) => {
        console.log(error);
        setLoading(false);
    };

    return (
        <div className="grid">
            {loading && <Loader />}
            <Row row={props.grid[0]}/>
            <Row row={props.grid[1]}/>
            <Row row={props.grid[2]}/>
            <Row row={props.grid[3]}/>
        </div>
    );
}

export default Grid;
