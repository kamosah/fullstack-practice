import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MessageListContainer = styled(Box)({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  flexGrow: 1,
  overflowY: 'visible',
  padding: 0,
  position: 'relative',
  width: '100%',
});
