import React from "react";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";

interface QuitModelProps {
  show: boolean;
  setModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuitModel: React.FC<QuitModelProps> = ({ show, setModel }) => {
  const navigator = useRouter();

  if (!show) return null;

  const handleQuit = () => {
    navigator.push("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-slate-800 opacity-90">
      <div className="text-blue-50 font-bold flex flex-col items-center gap-5">
        <div className="text-xl">Want to Quit this game?</div>
        <div className="flex gap-6">
          <Button handleClick={handleQuit}>Yes</Button>
          <Button handleClick={() => setModel(false)}>No</Button>
        </div>
      </div>
    </div>
  );
};

export default QuitModel;
