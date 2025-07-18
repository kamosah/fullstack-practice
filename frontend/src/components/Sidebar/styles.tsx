import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const SidebarRoot = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.grey[200]}`,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  width: 320,
}));
