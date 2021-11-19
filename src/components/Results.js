import React from 'react';
import './Results.css';

const Results = (props) => {
    return (
        <div className="results">
            <p>Replaced {props.searchVal} with {props.replaceVal} {props.countVal} time{props.countVal > 1 || props.countVal === 0 ? 's' : ''}.</p>
            <button onClick={props.downloadHandler}>Download processed file</button>
        </div>
    )
}

export default Results;