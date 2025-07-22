import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ToolbarRoot = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderRadius: '100%',
  boxShadow: 'none',
  display: 'flex',
  fontSize: '1.25rem',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1),
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  width: '100%',
}));

export const ToolbarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));
