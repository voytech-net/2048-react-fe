import React from "react";

function Cell(props) {
    return (
        <div className={"cell cell--" + props.label}>
            <span className="cell__label">{props.label > 0 ? props.label : ''}</span>
        </div>
    );
}

export default Cell;
