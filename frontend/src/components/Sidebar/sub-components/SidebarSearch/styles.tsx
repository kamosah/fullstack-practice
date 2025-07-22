import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const SidebarTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: Number(theme.shape.borderRadius) * 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: theme.palette.grey[200] },
    '&:hover fieldset': { borderColor: theme.palette.grey[300] },
    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
}));

export const SidebarSearchRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));
