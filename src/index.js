import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

class Board extends React.Component {

    render() {

        const lines = 3;
        let boardRows = [];

        for (let line = 0; line < lines; line++) {
            const boardRow = (
                <div className="board-row" key={line}>
                    {this.renderSquare(line * 3)}
                    {this.renderSquare(line * 3 + 1)}
                    {this.renderSquare(line * 3 + 2)}
                </div>
            );
            boardRows.push(boardRow);
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
}

function Square(props) {
    return (
        <button className="square"
                onClick={() => {
                    props.onClick()
                }}>
            {props.value}
        </button>
    );
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array.of(9).fill(null)
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
        let nextValueOfThePlayer = this.getNextValueOfThePlayer();
        let status = 'Next player: ' + nextValueOfThePlayer;
        if (winner) {
            this.state.isMatchFinished = true;
            status = "Winner: " + nextValueOfThePlayer;
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move # ' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
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
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        if (this.state.isMatchFinished) return;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[index] != null) return;
        squares[index] = this.getNextValueOfThePlayer();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            history: history.concat([{
                squares: squares
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
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Game/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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