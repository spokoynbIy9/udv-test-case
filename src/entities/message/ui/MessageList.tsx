import { useSelector } from 'react-redux';
import { getMessages } from '../model/selectors/getMessages';
import { List, Typography } from '@mui/material';
import { FC } from 'react';
import { MessageListItem } from './MessageListItem';

type MessageListProps = {
  room: string;
  quoteSomeMsg: (msgId: string) => void;
};

export const MessageList: FC<MessageListProps> = ({ room, quoteSomeMsg }) => {
  const messages = useSelector(getMessages(room));

  return (
    <List>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <MessageListItem
            key={msg.id}
            msg={msg}
            quoteSomeMsg={quoteSomeMsg}
            room={room}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          Здесь пока нет сообщений...
        </Typography>
      )}
    </List>
  );
};
