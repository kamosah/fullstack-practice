import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const AppContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));
