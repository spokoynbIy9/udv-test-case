import { AuthForm } from '@/entities/user/ui/AuthForm';
import { Container } from '@mui/material';

const AuthPage = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <AuthForm />
    </Container>
  );
};

export default AuthPage;
