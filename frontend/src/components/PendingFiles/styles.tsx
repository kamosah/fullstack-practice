import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const FileList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  marginBottom: theme.spacing(3),
}));
