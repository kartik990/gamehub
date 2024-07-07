import { BoardType, MessageType, MoveType } from "@/types/chess";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";

type Action =
  | {
      type: "updateBoard";
      payload: {
        board: BoardType;
        turn: "w" | "b";
        latestMove: MoveType;
        isCheck: boolean;
      };
    }
  | {
      type: "newGame";
      payload: { board: BoardType; col: "w" | "b"; gameId: string };
    }
  | { type: "changeMessages"; payload: { newMsg: MessageType } };

interface State {
  gameId: string;
  board: BoardType;
  messages: MessageType[];
  myCol: "w" | "b" | "";
  turn: "w" | "b" | "";
  moves: MoveType[];
  inCheck: boolean;
}

const initialState: State = {
  gameId: "",
  board: null,
  myCol: "",
  turn: "w",
  inCheck: false,
  moves: [],
  messages: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "updateBoard":
      return {
        ...state,
        board: action.payload.board,
        turn: action.payload.turn,
        moves: state.moves.concat(action.payload.latestMove),
        inCheck: action.payload.isCheck,
      };
    case "changeMessages":
      return { ...state, messages: [...state.messages, action.payload.newMsg] };
    case "newGame":
      return {
        ...state,
        board: action.payload.board,
        myCol: action.payload.col,
        gameId: action.payload.gameId,
      };
    default:
      return state;
  }
};

interface ContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const initialContext: ContextProps = {
  state: initialState,
  dispatch: () => null,
};

export const ChessContext = createContext<ContextProps>(initialContext);

const ChessContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChessContext.Provider value={{ state, dispatch }}>
      {children}
    </ChessContext.Provider>
  );
};

export default ChessContextProvider;
