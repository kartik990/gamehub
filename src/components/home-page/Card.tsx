import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import chess from "@/assets/chess.png";
import sudoku from "@/assets/sudoku.png";

export interface CardProps {
  href: string;
  setHover: Dispatch<SetStateAction<string>>;
  hover: string;
  title: string;
}

const getImg = (title: string) => {
  switch (title) {
    case "chess":
      return <Image src={chess} alt="chess" />;

    case "sudoku":
      return <Image src={sudoku} alt="chess" />;

    default:
      return null;
  }
};

const Card: React.FC<CardProps> = ({ setHover, hover, title, href }) => {
  return (
    <div>
      <Link href={href}>
        <div
          className="w-[250px] h-[250px] bg-col-1 hover:scale-125 cursor-pointer rounded-md   ease-linear  duration-150 flex flex-col justify-end overflow-hidden relative"
          onMouseEnter={() => {
            setHover(title);
          }}
          onMouseLeave={() => {
            setHover("");
          }}
        >
          <Image src={sudoku} alt={title} />
          <div
            className={`bg-slate-200 w-full p-4 text-col-4 ease-linear duration-100 absolute
                translate-y-20 ${hover == title ? "translate-y-0" : ""}`}
          >
            {title}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
