import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import chess from "@/assets/chess.png";
import sudoku from "@/assets/sudoku.png";
import snake from "@/assets/snake.png";

export default function Home() {
  const [hover, setHover] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-col-4 gap-20 ">
      <div className="text-7xl from-neutral-600 font-extrabold text-slate-200 mt-24">
        GameHub
      </div>
      <div className="flex justify-center items-center gap-20">
        <Link href="/sudoku">
          <div
            className="w-[250px] h-[250px] bg-col-1 hover:scale-125 cursor-pointer rounded-md   ease-linear  duration-150 flex flex-col justify-end overflow-hidden relative"
            onMouseEnter={() => {
              setHover("sudoku");
            }}
            onMouseLeave={() => {
              setHover("");
            }}
          >
            <Image src={sudoku} alt="sudoku" />
            <div
              className={`bg-slate-200 w-full p-4 text-col-4 opacity-90
                 ease-linear duration-100 absolute font-semibold
               text-xl  translate-y-20 ${
                 hover == "sudoku" ? "translate-y-0" : ""
               }`}
            >
              Sudoku
            </div>
          </div>
        </Link>
        <Link href="/snake-game">
          <div
            className="w-[250px] h-[250px] bg-col-1 hover:scale-125 cursor-pointer rounded-md   ease-linear  duration-150 flex flex-col justify-end overflow-hidden relative"
            onMouseEnter={() => {
              setHover("snake");
            }}
            onMouseLeave={() => {
              setHover("");
            }}
          >
            <Image src={snake} alt="snake game" />
            <div
              className={`bg-slate-200 w-full p-4 text-col-4 opacity-90
                 ease-linear duration-100 absolute font-semibold
               text-xl  translate-y-20 ${
                 hover == "snake" ? "translate-y-0" : ""
               }`}
            >
              Snake Game
            </div>
          </div>
        </Link>
        <Link href="/chess">
          <div
            className="w-[250px] h-[250px] bg-col-1 hover:scale-125 cursor-pointer rounded-md   ease-linear  duration-150 flex flex-col justify-end overflow-hidden relative"
            onMouseEnter={() => {
              setHover("chess");
            }}
            onMouseLeave={() => {
              setHover("");
            }}
          >
            <Image src={chess} alt="sudoku" />
            <div
              className={`bg-slate-200 w-full p-4 text-col-4 opacity-90
                 ease-linear duration-100 absolute font-semibold
               text-xl  translate-y-20 ${
                 hover == "chess" ? "translate-y-0" : ""
               }`}
            >
              Chess
            </div>
          </div>
        </Link>
        <Link href="/flappy-bird">
          <div
            className="w-[250px] h-[250px] bg-col-1 hover:scale-125 cursor-pointer rounded-md   ease-linear  duration-150 flex flex-col justify-end overflow-hidden relative"
            onMouseEnter={() => {
              setHover("fb");
            }}
            onMouseLeave={() => {
              setHover("");
            }}
          >
            {/* <Image src={sudoku} alt="flappy bird" /> */}
            IMG
            <div
              className={`bg-slate-200 w-full p-4 text-col-4 opacity-90
                 ease-linear duration-100 absolute font-semibold
               text-xl  translate-y-20 ${hover == "fb" ? "translate-y-0" : ""}`}
            >
              Flappy Bird
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
