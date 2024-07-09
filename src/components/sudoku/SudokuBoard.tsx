import React, { useEffect, useState } from "react";
import Cell from "./cell";
import { deepCopy } from "@/utils";
import Line from "./Line";
import { Favorite, FavoriteRounded } from "@mui/icons-material";
import { isSafe } from "@/utils/sudoku";
import { toast } from "react-toastify";

interface SudokuProps {
  board: string[][];
  solution: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

const SudokuBoard: React.FC<SudokuProps> = ({ board, solution, setBoard }) => {
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(
    null
  );

  const [lives, setLives] = useState<number>(4);

  const handleSelect = (r: number, c: number) => {
    if (board[r][c]) return;

    console.log({ r, c });
    setSelected({ r, c });
  };

  useEffect(() => {
    if (selected == null) return;

    const handler = (e: any) => {
      if (
        !(e?.key && (e.code.startsWith("Digit") || e.code.startsWith("Num")))
      ) {
        return;
      }

      const val = e.key;
      const { r, c } = selected;

      console.log(e);

      if (solution[r][c] == val) {
        const newBoard = deepCopy(board) as string[][];
        newBoard[r][c] = val;
        setBoard(newBoard);
      } else {
        setLives((prev) => prev - 1);
        toast.warn("Invalid Entry");
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [selected, board, solution, setBoard]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full relative">
      <div className="absolute top-0 left-0 translate-x-[-25%] translate-y-[-30%] rotate-[-20deg]  px-10 py-5 bg-col-3 text-white font-bold text-lg tracking-widest">
        Sudoku
      </div>
      <div className="grid grid-rows-9 grid-cols-9 gap-2 relative">
        {board.map((row, r) => {
          return row.map((val, c) => (
            <>
              <Cell
                handleSelect={() => handleSelect(r, c)}
                key={r + "," + c}
                value={val}
                r={r}
                c={c}
                selected={selected}
              />
            </>
          ));
        })}
        <div className="w-[5px] h-[425px] absolute bg-black top-[0px] left-[137.5px]" />
        <div className="w-[5px] h-[425px] absolute bg-black top-[0px] right-[137.5px]" />
        <div className="w-[425px] h-[5px] absolute bg-black top-[137.5px] left-[0px]" />
        <div className="w-[425px] h-[5px] absolute bg-black bottom-[137.5px] left-[0px]" />
      </div>
      <div className="flex gap-2 text-col-2 absolute top-3 right-3">
        {[...Array(4)].map((_, idx) => (
          <Favorite
            key={idx}
            className={`${idx <= lives ? "text-red-400" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SudokuBoard;
