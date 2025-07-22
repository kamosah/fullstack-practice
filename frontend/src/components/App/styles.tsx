import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const AppContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: `calc(100vh - ${theme.spacing(1)})`,
  width: `calc(100vw - ${theme.spacing(1)})`,
  padding: theme.spacing(1),
}));
