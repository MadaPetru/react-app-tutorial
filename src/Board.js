import React from "react";
import Square from "./Square";
import SquareHighLighted from "./SquareHighLighted";

class Board extends React.Component {

    render() {
        const lines = 3;
        let boardRows = [];
        for (let line = 0; line < lines; line++) {
            let row = [];
            for (let col = 0; col < 3; col++) {
                const uniqueIndex = line * 3 + col;
                if (this.props.isMatchFinished && this.props.winnerSquares && this.props.winnerSquares.includes(uniqueIndex)) {
                    const square = (
                        this.renderSquareHighLighted(uniqueIndex)
                    );
                    row.push(square);
                } else {
                    const square = (
                        this.renderSquare(uniqueIndex)
                    );
                    row.push(square);
                }
            }
            boardRows.push(
                <div className="board-row" key={line}>
                    {row}
                </div>
            );
        }

        return (
            <div>
                {boardRows}
            </div>
        );
    }

    renderSquare(index) {
        return (
            <Square value={this.props.squares[index]}
                    onClick={() => {
                        this.props.onClick(index)
                    }}
            />
        );
    }

    renderSquareHighLighted(index) {
        return (
            <SquareHighLighted value={this.props.squares[index]}
                               onClick={() => {
                                   this.props.onClick(index)
                               }}
            />
        );
    }
}

export default Board;