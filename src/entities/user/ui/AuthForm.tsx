import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useState } from 'react';
import { setUser } from '../model/slice/userSlice';
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRooms } from '@/entities/room/model/selectors/getRooms';
import { addRoom } from '@/entities/room/model/slice/roomsSlice';
import ClearIcon from '@mui/icons-material/Clear';

export const AuthForm = () => {
  const rooms = useSelector(getRooms);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const isFormValid =
    Boolean(name.trim()) && (Boolean(room) || Boolean(newRoom.trim()));
  const isRoomConflict = Boolean(newRoom) && rooms.includes(newRoom.trim());

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const selectedRoom = newRoom.trim() || room;
    if (name.trim() || selectedRoom) {
      dispatch(setUser({ name, room: selectedRoom }));
      if (!rooms.includes(selectedRoom)) {
        dispatch(addRoom(selectedRoom));
      }
      navigate('/chat');
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <TextField
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {rooms.length > 0 && (
        <FormControl fullWidth>
          <InputLabel
            sx={{
              backgroundColor: 'background.paper',
              paddingLeft: '4px',
              paddingRight: '4px',
            }}
          >
            Выберите комнату
          </InputLabel>
          <Select
            disabled={Boolean(newRoom)}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            endAdornment={
              room && (
                <InputAdornment position="end" sx={{ marginRight: '8px' }}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRoom('');
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          >
            {rooms.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <TextField
        disabled={Boolean(room)}
        label={
          rooms.length > 0 ? 'Или создайте новую комнату' : 'Создать комнату'
        }
        value={newRoom}
        onChange={(e) => {
          setRoom('');
          setNewRoom(e.target.value);
        }}
        error={isRoomConflict}
        helperText={isRoomConflict ? 'Комната уже существует' : ''}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={!isFormValid || isRoomConflict}
      >
        Войти
      </Button>
    </Container>
  );
};
