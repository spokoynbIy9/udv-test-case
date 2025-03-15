import { AuthPage } from '@/pages/AuthPage';
import { ChatPage } from '@/pages/ChatPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRedirect } from './providers/AuthRedirect/ui/AuthRedirect';
import { GuestRedirect } from './providers/GuestRedirect/ui/GuestRedirect';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route
        path="/auth"
        element={
          <GuestRedirect>
            <AuthPage />
          </GuestRedirect>
        }
      />
      <Route
        path="/chat"
        element={
          <AuthRedirect>
            <ChatPage />
          </AuthRedirect>
        }
      />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}

export default App;
