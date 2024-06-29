import ChessContextProvider from "@/context/chess";
import ChessGameWrapper from "@/components/chess/ChessGameWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chess = () => {
  return (
    <ChessContextProvider>
      <ChessGameWrapper />
      <ToastContainer />
    </ChessContextProvider>
  );
};

export default Chess;
