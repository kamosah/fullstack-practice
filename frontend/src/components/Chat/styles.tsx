import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const ChatContainer = styled(Paper)(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  padding: theme.spacing(2),
}));
