import { Chat } from '@/widgets/Chat/ui/Chat';
import { Container } from '@mui/material';

const ChatPage = () => {
  return (
    <Container
      maxWidth="sm"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <Chat />
    </Container>
  );
};

export default ChatPage;
