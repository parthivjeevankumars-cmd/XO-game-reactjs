import { useState } from "react";
import "./App.css";

export default function App() {

  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");

  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function checkWinner(currentBoard) {

    for (let pattern of winningPatterns) {

      const [a, b, c] = pattern;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  }

  const winner = checkWinner(board);

  function handleClick(index) {

    if (board[index] !== "" || winner) return;

    const newBoard = [...board];

    newBoard[index] = turn;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner === "X") {
      setXScore(xScore + 1);
    }

    else if (gameWinner === "O") {
      setOScore(oScore + 1);
    }

    setTurn(turn === "X" ? "O" : "X");
  }

  function restartGame() {
    setBoard(Array(9).fill(""));
    setTurn("X");
  }

  const isDraw =
    !winner &&
    board.every(cell => cell !== "");

  return (
    <div className="container">

      <h1 className="title">NEON XO</h1>

      <div className="scoreboard">
        <div>X : {xScore}</div>
        <div>O : {oScore}</div>
      </div>

      <div className="status">

        {winner
          ? `${winner} Wins!`
          : isDraw
          ? "Draw Match"
          : `Turn : ${turn}`}

      </div>

      <div className="board">

        {board.map((cell, index) => (

          <div
            className={`cell ${cell}`}
            key={index}
            onClick={() => handleClick(index)}
          >

            {cell}

          </div>

        ))}

      </div>

      <button className="restart" onClick={restartGame}>
        Restart
      </button>

    </div>
  );
}