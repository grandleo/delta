import React from 'react';

function QtyChanger({qty, handleChange}) {
    return (
        <div className="qty-changer mt-2">
            <button
                className="btn btn-light btn-sm shadow-btn-3"
                onClick={() => handleChange(-1)}
                >-</button>
            <span className="mx-2 px-1">{qty}</span>
            <button
                className="btn btn-danger btn-sm shadow-btn-3"
                onClick={() => handleChange(+1)}
                >+</button>
        </div>
    );
}

export { QtyChanger };
