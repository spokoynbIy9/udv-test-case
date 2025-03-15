import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getMessagePerId } from '../model/selectors/getMessagePerId';
import { ListItemText, Typography } from '@mui/material';

type QuotedMessageProps = {
  quotedId: string;
  room: string;
};

export const QuotedMessage: FC<QuotedMessageProps> = ({ quotedId, room }) => {
  const quotedMsg = useSelector(getMessagePerId(room, quotedId));

  return (
    <div style={{ display: 'flex' }}>
      <ListItemText
        sx={{ borderLeft: '1px solid black', padding: '5px' }}
        primary={
          <Typography variant="subtitle2" color="primary">
            {quotedMsg!.author}
          </Typography>
        }
        secondary={quotedMsg!.text}
      />
    </div>
  );
};
