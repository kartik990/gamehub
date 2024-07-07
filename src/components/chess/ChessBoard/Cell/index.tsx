import pieceBb from "@/assets/pieces/Chess_bdt45.svg";
import pieceBk from "@/assets/pieces/Chess_kdt45.svg";
import pieceBq from "@/assets/pieces/Chess_qdt45.svg";
import pieceBr from "@/assets/pieces/Chess_rdt45.svg";
import pieceBp from "@/assets/pieces/Chess_pdt45.svg";
import pieceBn from "@/assets/pieces/Chess_ndt45.svg";
import pieceWn from "@/assets/pieces/Chess_nlt45.svg";
import pieceWr from "@/assets/pieces/Chess_rlt45.svg";
import pieceWq from "@/assets/pieces/Chess_qlt45.svg";
import pieceWk from "@/assets/pieces/Chess_klt45.svg";
import pieceWb from "@/assets/pieces/Chess_blt45.svg";
import pieceWp from "@/assets/pieces/Chess_plt45.svg";
import Image from "next/image";
import { CellType } from "@/types/chess";
import { useContext } from "react";
import { ChessContext } from "@/context/chess";

interface CellProps {
  isDarkCell: boolean;
  cell: CellType | null;
  isInverted: boolean;
  selected: boolean;
}

export function getPiece(type: string | undefined, color: string | undefined) {
  if (!color || !type) return null;

  const key = `${color}${type}`;
  let img = null;

  switch (key) {
    case "bk":
      img = pieceBk;
      break;
    case "bq":
      img = pieceBq;
      break;
    case "br":
      img = pieceBr;
      break;
    case "bb":
      img = pieceBb;
      break;
    case "bn":
      img = pieceBn;
      break;
    case "bp":
      img = pieceBp;
      break;
    case "wk":
      img = pieceWk;
      break;
    case "wq":
      img = pieceWq;
      break;
    case "wr":
      img = pieceWr;
      break;
    case "wb":
      img = pieceWb;
      break;
    case "wn":
      img = pieceWn;
      break;
    case "wp":
      img = pieceWp;
      break;
    default:
      img = null;
  }

  return img;
}

const Cell: React.FC<CellProps> = ({
  isDarkCell,
  cell,
  isInverted,
  selected,
}) => {
  const {
    state: { inCheck, turn },
  } = useContext(ChessContext);

  const img = getPiece(cell?.type, cell?.color);
  const check = inCheck && turn == cell?.color && cell?.type == "k";

  return (
    <div
      className={`flex justify-center items-center text-base border-solid border-2 hover:border-slate-700 relative w-[60px] h-[60px] ${
        isInverted ? "rotate-180" : ""
      }  ${isDarkCell ? "bg-col-1 border-col-1" : ""} ${
        check ? "bg-red-400 border-none" : ""
      }
        ${selected ? "border-4 border-b-8 border-slate-700" : ""}
        `}
    >
      {img ? <Image width={48} height={48} src={img} alt="piece" /> : null}
    </div>
  );
};

export default Cell;
