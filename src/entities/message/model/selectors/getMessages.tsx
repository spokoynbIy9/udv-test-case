import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getMessages = (room: string) => (state: RootState) =>
  state.messages.messages[room] || [];
