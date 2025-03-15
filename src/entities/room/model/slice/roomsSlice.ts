import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RoomState = {
  rooms: string[];
};

const loadRooms = (): string[] => {
  const data = localStorage.getItem('rooms');
  return data ? JSON.parse(data) : [];
};

const saveRooms = (rooms: string[]) => {
  try {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  } catch (e) {
    console.error('Error saving messages', e);
  }
};

const initialState: RoomState = {
  rooms: loadRooms(),
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<string>) => {
      if (!state.rooms.includes(action.payload)) {
        const updatedRooms = [...state.rooms, action.payload];
        state.rooms = updatedRooms;
        saveRooms(updatedRooms);
      }
    },
  },
});

export const { addRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
