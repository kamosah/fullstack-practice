import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';

export const SidebarListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{
  isSelected: boolean;
}>(({ theme, isSelected }) => ({
  borderRadius: 4,
  marginTop: 2,
  marginBottom: 2,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderLeft: '3px solid',
  borderLeftColor: isSelected ? theme.palette.primary.dark : 'transparent',
  transition: 'all 0.2s',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderLeftColor: theme.palette.primary.dark,
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));
