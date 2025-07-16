import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
export const ConversationArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  maxWidth: 900,
  margin: '0 auto',
}));
