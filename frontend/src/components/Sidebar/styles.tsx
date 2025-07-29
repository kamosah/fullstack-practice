import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { Layout } from '../../styles/layout';

export const SidebarRoot = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  width: Layout.sidebarWidth,
}));
