import React, {useEffect, useState} from "react";
import Grid from "./../Grid";
import {client} from "../../utilities/Apollo";
import NEW_GAME from "../../query/Game/createGame";
import Loader from '../../components/Loader'

function Game(props) {
    const [grid, setGrid] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await client.query({query: NEW_GAME})
                .then(response => onDataSuccess(response))
                .catch(error => onDataError(error));
        }
        fetchData();
    }, []);

    const onDataSuccess = (response) => {
        setGrid(response.data.newGame.state);
        setLoading(false);
    };

    const onDataError = (error) => {
        setLoading(false);
        console.log(error);
    };

    return (
        <div className="game">
            {loading && <Loader />}
            {!loading &&
            <Grid
                grid={grid}
                setGridState={setGrid}
                score={props.score}
                setScore={props.setScore}
                best={props.best}
                setBest={props.setBest}
                status={props.status}
                setStatus={props.setStatus}
            /> }
        </div>
    );
}

export default Game;
