import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getRooms = (state: RootState) => state.rooms.rooms;
