import { getUser } from '@/entities/user/model/selectors/getUser';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name || !user.room) {
      navigate('/auth');
    }
  }, [user, navigate]);

  return <>{children}</>;
};
