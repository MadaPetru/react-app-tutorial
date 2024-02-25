import React from "react";
import Board from "./Board";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array.of(9).fill(null),
                positions: Array.of(9).fill(Array.of(2).fill(null))
            }],
            xIsNext: true,
            isMatchFinished: false,
            stepNumber: 0
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const winnerSquares = getWinnerSquares(current.squares);
        let status = 'Next player: ' + this.getNextValueOfThePlayer();
        if (winner) {
            this.state.isMatchFinished = true;
            status = "Winner: " + this.getCurrentValueOfThePlayer();
        }
        if (history.length === 10 && !winner) {
            this.state.isMatchFinished = true;
            status = "Draw";
        }

        const moves = history.map((step, move) => {

            let pairs = [];
            if (step.positions != null && step.positions.at(1)) {
                for (let pair of step.positions) {
                    pairs.push(
                        <div key={pair}>
                            {pair[0]} | {pair[1]}
                        </div>
                    );
                }
            }

            const desc = move ?
                'Go to move # ' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    <div>
                        {pairs}
                    </div>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        isMatchFinished={this.state.isMatchFinished}
                        winnerSquares={winnerSquares}
                        squares={current.squares}
                        onClick={(index) => this.handleClick(index)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {status}
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    };

    handleClick(index) {
        if (this.state.isMatchFinished) return;
        const positionInMatrix = [Math.floor(index / 3), index % 3];
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const positions = current.positions.slice();
        positions.push(positionInMatrix);
        if (squares[index] != null) return;
        squares[index] = this.getNextValueOfThePlayer();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            history: history.concat([{
                squares: squares,
                positions: positions
            }]),
            stepNumber: history.length
        });
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0
        })
    }

    getNextValueOfThePlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    getCurrentValueOfThePlayer() {
        return this.state.xIsNext ? 'O' : 'X';
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function getWinnerSquares(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}

export default Game;