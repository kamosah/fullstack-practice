import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const HandleRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 4,
  backgroundColor: theme.palette.grey[200],
  cursor: 'row-resize',
  transition: 'background-color 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const HandleBar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.grey[400],
  borderRadius: 999,
  width: 24,
  height: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.main,
  },
}));
