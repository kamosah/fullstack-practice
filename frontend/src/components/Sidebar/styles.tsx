import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const SidebarRoot = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  width: 320,
}));
