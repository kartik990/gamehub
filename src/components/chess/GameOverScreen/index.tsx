import { GameOverReasons } from "@/types/chess";
import Link from "next/link";
import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { LoginOutlined } from "@mui/icons-material";
import BalanceIcon from "@mui/icons-material/Balance";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import MoodBadIcon from "@mui/icons-material/MoodBad";

interface GameOverScreenProps {
  reason: GameOverReasons | null;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ reason }) => {
  const getStateMent = () => {
    switch (reason) {
      case GameOverReasons.MyTimeUp:
        return (
          <div>
            <HourglassBottomIcon
              fontSize="large"
              className="scale-[200%] mr-5"
            />
            {`Your Time's Up Opponent Won!`}
          </div>
        );
      case GameOverReasons.OpponentTimeUp:
        return (
          <div>
            <EmojiEventsIcon fontSize="large" className="scale-[200%] mr-5" />
            {"Opponent Time's Up You Won!"}
          </div>
        );
      case GameOverReasons.CheckMateMeWon:
        return (
          <div>
            <EmojiEventsIcon fontSize="large" className="scale-[200%] mr-5" />
            {"CheckMate You Won!"}
          </div>
        );
      case GameOverReasons.CheckMateOppWon:
        return (
          <div>
            <MoodBadIcon fontSize="large" className="scale-[200%] mr-5" />
            {"CheckMate Opponent Won!"}
          </div>
        );
      case GameOverReasons.StaleMate:
        return (
          <div>
            <DoNotDisturbOnIcon
              fontSize="large"
              className="scale-[200%] mr-5"
            />
            {"StaleMate!"}
          </div>
        );
      case GameOverReasons.Draw:
        return (
          <div>
            <BalanceIcon fontSize="large" className="scale-[200%] mr-5" />
            {"It's a draw!"}
          </div>
        );
      case GameOverReasons.OpponentLeft:
        return (
          <div>
            <EmojiEventsIcon fontSize="large" className="scale-[200%] mr-5" />
            {"Yon Won Other player resign!"}
          </div>
        );
      default:
        return "Game Over";
    }
  };

  return (
    <div className="w-full h-full opacity-85 bg-col-4 absolute top-0 left-0 flex flex-col justify-center items-center gap-4">
      <div className="text-5xl text-bold text-white ">{getStateMent()}</div>
      <Link
        href="/"
        className="text-xl text-white font-bold hover:scale-125 cursor-pointer"
      >
        Home <LoginOutlined />
      </Link>
    </div>
  );
};

export default GameOverScreen;
