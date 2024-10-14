import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import chess from "@/assets/chess.png";
import sudoku from "@/assets/sudoku.png";
import snake from "@/assets/snake.png";
import flappy from "@/assets/flappy.png";

export default function Home() {
  const [hover, setHover] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-col-4 via-col-4  to-col-1 gap-16">
      <div className="text-7xl from-neutral-600 font-extrabold text-slate-200 mt-24">
        GameHub
      </div>
      <div className="flex justify-center items-center gap-12">
        <Link href="/sudoku">
          <div
            className="w-[250px] h-[250px] bg-col-1 hover:scale-125 cursor-pointer rounded-md   ease-linear  duration-150 flex flex-col justify-end overflow-hidden  relative"
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
                 ease-linear duration-300 absolute font-semibold
               text-xl translate-x-full ${
                 hover == "sudoku" ? "transform-none" : ""
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
                 ease-linear duration-300 absolute font-semibold
               text-xl  translate-x-full ${
                 hover == "snake" ? "transform-none" : ""
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
                 ease-linear duration-300 absolute font-semibold
               text-xl  translate-x-full ${
                 hover == "chess" ? "transform-none" : ""
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
            <Image src={flappy} alt="flappy bird" />
            <div
              className={`bg-slate-200 w-full p-4 text-col-4 opacity-90
                 ease-linear duration-300 absolute font-semibold
               text-xl  translate-x-full ${
                 hover == "fb" ? "transform-none" : ""
               }`}
            >
              Flappy Bird
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
