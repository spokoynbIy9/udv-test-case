import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getMessagePerId =
  (room: string, id: string | null) => (state: RootState) => {
    if (id) {
      const curMessage = state.messages.messages[room].find(
        (message) => message.id === id
      );
      return curMessage;
    }
    return null;
  };
