import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types/message';

type MessagesState = {
  messages: Record<string, Message[]>;
};

const loadMessages = (): Record<string, Message[]> => {
  try {
    const data = localStorage.getItem('messages');
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error loading messages', e);
    return {};
  }
};

const initialState: MessagesState = {
  messages: loadMessages(),
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id'>>) => {
      if (!state.messages[action.payload.room]) {
        state.messages[action.payload.room] = [];
      }

      const newMessage = {
        id: crypto.randomUUID(),
        ...action.payload,
      };
      state.messages[action.payload.room].push(newMessage);

      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
    updateFromStorage: (
      state,
      action: PayloadAction<Record<string, Message[]>>
    ) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, updateFromStorage } = messagesSlice.actions;
export default messagesSlice.reducer;
