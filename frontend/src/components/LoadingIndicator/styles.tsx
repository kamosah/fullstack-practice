import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  minHeight: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));
