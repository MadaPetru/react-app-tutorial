import React from "react";

function SquareHighLighted(props) {
    return (
        <button className="square normal"
                onClick={() => {
                    props.onClick()
                }}>
            {props.value}
        </button>
    );
}

export default SquareHighLighted;