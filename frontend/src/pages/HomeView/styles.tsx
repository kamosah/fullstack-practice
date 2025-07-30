import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const HomeContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: Number(theme.shape.borderRadius),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  margin: '0 auto',
  padding: theme.spacing(1),
}));
