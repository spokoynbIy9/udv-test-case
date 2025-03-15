import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { QuotedMessage } from './QuotedMessage';
import { Message } from '../model/types/message';
import { FC } from 'react';

type MessageListItemProps = {
  msg: Message;
  quoteSomeMsg: (msgId: string) => void;
  room: string;
};

export const MessageListItem: FC<MessageListItemProps> = ({
  msg,
  quoteSomeMsg,
  room,
}) => {
  return (
    <ListItem key={msg.id} divider>
      <ListItemText
        primary={
          <Typography variant="subtitle2" color="primary">
            {msg.author}
          </Typography>
        }
        secondary={msg.text}
      />

      <Typography sx={{ marginLeft: '8px' }}>
        {new Date(msg.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Typography>

      <IconButton onClick={() => quoteSomeMsg(msg.id)}>
        <ReplyIcon />
      </IconButton>

      {msg.quotedId && <QuotedMessage room={room} quotedId={msg.quotedId} />}
    </ListItem>
  );
};
