import Button from "@/components/atoms/Button";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import Timer from "@/components/sudoku/Timer";
import React, { useEffect, useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuitModel from "@/components/molecule/QuitModel";
import { ContentPaste, LogoutOutlined } from "@mui/icons-material";
import { deepCopy } from "@/utils";
import Link from "next/link";

const Sudoku = () => {
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState<number[][] | null>(null);
  const [solution, setSolution] = useState<number[][] | null>(null);
  const [quitModel, setQuitModel] = useState(false);
  const [lives, setLives] = useState<number>(4);
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(
    null
  );
  const [winner, setWinner] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState({ min: 0, sec: 0 });

  // https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:5){grids{value,solution,difficulty},results,message}}

  const func = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}"
      );
      const data = await res.json();
      console.log(data);
      const fetchedBoard = data.newboard.grids[0].value;
      const solvedBoard = data.newboard.grids[0].solution;
      if (res.ok) {
        setBoard(fetchedBoard);
        setSolution(solvedBoard);
      } else {
        toast.warning("cannot connect");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGiveUp = () => {
    setBoard(solution);
    setSelected(null);
  };

  const handleSelectValue = (value: number) => {
    if (selected == null || !solution) return;

    const { r, c } = selected;

    if (solution[r][c] == value) {
      const newBoard = deepCopy(board) as number[][];
      newBoard[r][c] = value;
      setBoard(newBoard);
      setSelected(null);
    } else {
      setLives((prev) => prev - 1);
    }
  };

  const handleNewBoard = () => {
    func();
    setLives(4);
    setWinner(false);
    setTime({ min: 0, sec: 0 });
  };

  useEffect(() => {
    func();
  }, []);

  useEffect(() => {
    if (!board || !solution) return;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== solution[i][j]) {
          return;
        }
      }
    }

    setWinner(true);
  }, [board, solution]);

  useEffect(() => {
    if (lives == 0) {
      setGameOver(true);
    }
  }, [lives]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-col-4">
      <div className="w-[100%] h-[80%] flex justify-between flex-col md:flex-row md:w-[80%] ">
        <div
          className={`w-[68%] bg-col-1 flex justify-center items-center relative ${
            winner ? "border-8 border-green-600" : ""
          }`}
        >
          {board && solution && !loading ? (
            <SudokuBoard
              board={board}
              setBoard={setBoard}
              solution={solution}
              lives={lives}
              setLives={setLives}
              setSelected={setSelected}
              selected={selected}
            />
          ) : (
            <div className="text-xl font-bold text-white">{`Loading...`}</div>
          )}

          {!winner && (
            <div className="absolute bottom-2 w-[420px] h-12 flex justify-between items-center">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="text-xl flex justify-center font-bold text-white hover:text-5xl   cursor-pointer ease-in-out duration-200"
                  onClick={() => {
                    handleSelectValue(i + 1);
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-[30%] p-5 bg-col-2 flex flex-col justify-between">
          <Timer winner={winner} time={time} setTime={setTime} />
          <div>
            {`A 9 x 9 square must be filled in with numbers from 1-9 with no
            repeated numbers in each line, horizontally or vertically. To
            challenge you more, there are 3 x 3 squares marked out in the grid,
            and each of these squares can't have any repeat numbers either.`}
          </div>
          <div>
            {`After selecting an empty cell you can use both dialer and keyboard numbers to put values.`}
          </div>
          <div className="flex flex-col gap-2">
            <Button handleClick={() => handleGiveUp()}>
              <ContentPaste /> Give up and see solution
            </Button>
            <div className="w-full mx-auto flex gap-2  ">
              <button
                className="w-full bg-col-1 px-4 py-2 rounded-md hover:bg-col-3 cursor-pointer 
              flex justify-center items-center gap-2 font-bold text-white"
                onClick={() => {
                  handleNewBoard();
                }}
              >
                <ReplayIcon />
                New Board
              </button>
              <button
                className="w-full bg-col-1 px-4 py-2 rounded-md hover:bg-col-3 cursor-pointer 
              flex justify-center items-center gap-2 font-bold text-white"
                onClick={() => setQuitModel(true)}
              >
                <LogoutOutlined />
                Quit
              </button>
            </div>
          </div>
        </div>
      </div>
      {gameOver && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-slate-600 opacity-80 flex flex-col justify-center items-center">
          <div className="text-5xl font-extrabold text-white mb-4">
            Game Over
          </div>
          <div className="flex gap-2">
            <div className="mt-4 flex gap-6 text-white text-xl">
              <div
                className="hover:scale-110 cursor-pointer"
                onClick={() => {
                  setGameOver(false);
                  handleGiveUp();
                }}
              >
                See solution
              </div>
              <div
                className="hover:scale-110 cursor-pointer"
                onClick={() => {
                  setGameOver(false);
                  handleNewBoard();
                }}
              >
                New Game
              </div>
              <Link href="/" className="hover:scale-110">
                Quit
              </Link>
            </div>
          </div>
        </div>
      )}
      <QuitModel show={quitModel} setModel={setQuitModel} />
    </div>
  );
};

export default Sudoku;
