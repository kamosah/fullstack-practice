import Box, { type BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const AppContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: `100vh`,
  width: '100vw',
}));

export const MainContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: Number(theme.shape.borderRadius),
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowY: 'auto',
  paddingTop: theme.spacing(2),
  width: '100%',
}));
