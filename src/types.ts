export type Column = {
  name: string;
  items: string[];
  color: string;
};

export type ColumnWithId = Column & {
  id: string;
};

export type Board = {
  name: string;
  columns: Record<string, ColumnWithId>;
};

export type UserBoards = {
  [key: string]: Board;
};
