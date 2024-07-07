import React from "react";
import { getPiece } from "../Cell";
import Image from "next/image";

interface PromotionCardProps {
  col: string | undefined;
  setPromoteTo: React.Dispatch<React.SetStateAction<string | null>>;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ col, setPromoteTo }) => {
  const pieces = [
    {
      type: "q",
      src: getPiece("q", col),
    },
    {
      type: "r",
      src: getPiece("r", col),
    },
    {
      type: "b",
      src: getPiece("b", col),
    },
    {
      type: "n",
      src: getPiece("n", col),
    },
  ];

  return (
    <div className="w-[480px] px-4 py-2 bg-white flex justify-center gap-6">
      {pieces.map((piece) => (
        <Image
          key={piece.type}
          alt="piece"
          src={piece.src}
          width={40}
          height={20}
          className="hover:scale-110 cursor-pointer"
          onClick={() => setPromoteTo(piece.type)}
        />
      ))}
    </div>
  );
};

export default PromotionCard;
