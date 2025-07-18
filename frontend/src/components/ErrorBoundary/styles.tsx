import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.error.light,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `1px solid ${theme.palette.error.light}`,
  textAlign: 'center',
  maxWidth: 400,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export const ErrorIconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.error.light,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ErrorStack = styled(Stack)({
  alignItems: 'center',
});
