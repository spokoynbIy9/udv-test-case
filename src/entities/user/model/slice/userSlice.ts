import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string;
  room: string;
};

const loadUser = (): UserState => {
  const data = sessionStorage.getItem('user');
  return data ? JSON.parse(data) : { name: '', room: '' };
};

const initialState: UserState = loadUser();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.room = action.payload.room;
      sessionStorage.setItem('user', JSON.stringify(state));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
