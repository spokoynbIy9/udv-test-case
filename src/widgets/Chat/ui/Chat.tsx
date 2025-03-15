import { getMessagePerId } from '@/entities/message/model/selectors/getMessagePerId';
import { MessageList } from '@/entities/message/ui/MessageList';
import { getUser } from '@/entities/user/model/selectors/getUser';
import { SendMessage } from '@/features/SendMessage/ui/SendMessage';
import {
  Box,
  IconButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

export const Chat = () => {
  const user = useSelector(getUser);
  const [quotedId, setquotedId] = useState<string | null>(null);
  const quotedMsg = useSelector(getMessagePerId(user.room, quotedId));

  const quoteSomeMsg = (msgId: string) => setquotedId(msgId);
  const deleteQuotedMsg = () => setquotedId(null);

  return (
    <>
      <Paper
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
          marginBottom: '10px',
        }}
      >
        <MessageList room={user.room} quoteSomeMsg={quoteSomeMsg} />
      </Paper>
      {quotedId && (
        <Box
          component="section"
          sx={{
            display: 'flex',
            p: 2,
            border: '1px dashed grey',
            marginBottom: '10px',
          }}
        >
          <ListItemText
            primary={
              <Typography variant="subtitle2" color="primary">
                {quotedMsg!.author}
              </Typography>
            }
            secondary={quotedMsg!.text}
          />
          <IconButton onClick={deleteQuotedMsg}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <SendMessage quotedId={quotedId} deleteQuotedMsg={deleteQuotedMsg} />
    </>
  );
};
