export type CellType = null | {
  color: string;
  square: string;
  type: string;
};

export type BoardType = CellType[][] | null;

export type MessageType = {
  senderId: string;
  content: string;
  timeStamp: Date;
};

export type MoveType = { from: string; to: string; col: string; piece: string };
