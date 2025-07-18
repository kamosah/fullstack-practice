import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MessageListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  height: '100%',
  overflowY: 'auto',
  padding: theme.spacing(2),
  position: 'relative',
  width: '100%',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#c1c1c1',
    borderRadius: '3px',
  },
}));
