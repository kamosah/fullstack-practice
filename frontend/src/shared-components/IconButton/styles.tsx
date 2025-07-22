import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
