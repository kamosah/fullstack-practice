import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ConversationArea = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  margin: '0 auto',
  maxWidth: 900,
  overflow: 'hidden',
  padding: theme.spacing(2),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  display: 'flex',
  width: '100%',
}));
