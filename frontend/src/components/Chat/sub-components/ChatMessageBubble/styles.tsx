import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MessageBubbleBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{
  isUser: boolean;
}>(({ theme, isUser }) => ({
  backgroundColor: isUser ? theme.palette.grey[50] : 'transparent',
  borderRadius: 24,
  boxShadow: isUser ? theme.shadows[1] : 'none',
  color: isUser ? theme.palette.grey[900] : theme.palette.text.primary,
  justifyContent: 'flex-end',
  maxWidth: '70%',
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
}));
