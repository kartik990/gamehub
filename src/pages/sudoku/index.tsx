import Button from "@/components/atoms/Button";
import OptionsStrip from "@/components/sudoku/OptionsStrip";
import SudokuBoard from "@/components/sudoku/SudokuBoard";
import Timer from "@/components/sudoku/Timer";
import React, { useEffect, useState } from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ReplayIcon from "@mui/icons-material/Replay";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import Table from "@/components/sudoku/Table";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// undo and redo
// reset board
// auto solve
// auto check and display done when completed
// selected next number by click hover a strip containing number 1-9
// timer
// best score

// initial board based on difficulty numbers filled already so

const Sudoku = () => {
  const [board, setBoard] = useState<string[][] | null>(null);
  const [solution, setSolution] = useState<string[][] | null>(null);

  // https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:5){grids{value,solution,difficulty},results,message}}

  const func = async () => {
    try {
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
    }
  };

  useEffect(() => {
    func();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-col-4">
      <div className="w-[100%] h-[80%] flex justify-between flex-col md:flex-row md:w-[80%] ">
        <div className="w-[68%] bg-col-1 flex justify-center items-center">
          {board && solution ? (
            <SudokuBoard
              board={board}
              setBoard={setBoard}
              solution={solution}
            />
          ) : (
            `Loading...`
          )}
        </div>
        <div className="w-[30%] p-5 bg-col-2 flex flex-col justify-between">
          <Timer />
          <div>
            {`A 9 x 9 square must be filled in with numbers from 1-9 with no
            repeated numbers in each line, horizontally or vertically. To
            challenge you more, there are 3 x 3 squares marked out in the grid,
            and each of these squares can't have any repeat numbers either.`}
          </div>
          {/* <div className="w=full text-lg font-bold flex gap-2 justify-between items-center">
            <div>
              Difficulty :{" "}
              {difficulty == "Easy" ? (
                <span className="text-green-700">Easy</span>
              ) : difficulty == "Medium" ? (
                <span className="text-yellow-700">Medium</span>
              ) : (
                <span className="text-red-700">Hard</span>
              )}
            </div>
            <Button>
              <ReplayIcon />
              Try another
            </Button>
          </div> */}
          {/* <OptionsStrip /> */}
          {/* <Table /> */}
          <div className="w-full mx-auto grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2">
            {/* <Button>
              <UndoIcon /> Undo
            </Button>
            <Button>
              <RedoIcon />
              Redo
            </Button>
            <Button>
              <SentimentDissatisfiedIcon /> Give up
            </Button>
            <Button>
              <ReplayIcon />
              Reset
            </Button> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sudoku;
