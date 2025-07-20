import Box from '@mui/material/Box';
import ListSubheader, { type ListSubheaderProps } from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';

export const SidebarConversationListRoot = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: 0,
});

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.grey[500],
  fontSize: 14,
}));

export const SidebarListSubheader = styled(ListSubheader)<ListSubheaderProps>({
  backgroundColor: 'transparent',
});
