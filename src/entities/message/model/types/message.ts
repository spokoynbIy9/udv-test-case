export type Message = {
  id: string;
  text: string;
  timestamp: number;
  author: string;
  room: string;
  quotedId?: string | null;
};
