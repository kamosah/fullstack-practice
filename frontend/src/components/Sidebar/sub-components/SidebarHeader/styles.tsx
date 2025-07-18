import { ListItemButton, ListItemIcon } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const SidebarHeaderRoot = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

export const SidebarListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'center',
  minWidth: 24,
}));

export const SidebarHeaderListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 1,
  color: theme.palette.text.primary,
  pl: 1,
  pr: 1,
  py: 0.5,
}));
