import {
  addMessage,
  updateFromStorage,
} from '@/entities/message/model/slice/messagesSlice';
import { IconButton, Popover, TextField } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/entities/user/model/selectors/getUser';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type SendMessageProps = {
  deleteQuotedMsg: () => void;
  quotedId: string | null;
};

export const SendMessage: FC<SendMessageProps> = ({
  quotedId,
  deleteQuotedMsg,
}) => {
  const { name, room } = useSelector(getUser);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [emojiAnchor, setEmojiAnchor] = useState<null | HTMLElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(
      addMessage({
        text: message,
        timestamp: Date.now(),
        author: name,
        room,
        quotedId: quotedId,
      })
    );
    setMessage('');
    deleteQuotedMsg();
  };

  const handleEmojiClick = (emojiObj: EmojiClickData) => {
    setMessage((prev) => prev + emojiObj.emoji);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'messages') {
        const messages = JSON.parse(event.newValue || '{}');
        dispatch(updateFromStorage(messages));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <IconButton onClick={(e) => setEmojiAnchor(e.currentTarget)}>
        <EmojiEmotionsIcon />
      </IconButton>
      <Popover
        open={Boolean(emojiAnchor)}
        anchorEl={emojiAnchor}
        onClose={() => setEmojiAnchor(null)}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Popover>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <IconButton onClick={handleSend} color="primary">
        <SendIcon />
      </IconButton>
    </div>
  );
};
