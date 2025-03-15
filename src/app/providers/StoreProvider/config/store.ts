import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '@/entities/message/model/slice/messagesSlice';
import userReducer from '@/entities/user/model/slice/userSlice';
import roomsReducer from '@/entities/room/model/slice/roomsSlice';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
    rooms: roomsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
