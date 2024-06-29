import ChessContextProvider from "@/context/chess";
import ChessGameWrapper from "@/components/chess/ChessGameWrapper";

const Chess = () => {
  return (
    <ChessContextProvider>
      <ChessGameWrapper />
    </ChessContextProvider>
  );
};

export default Chess;
