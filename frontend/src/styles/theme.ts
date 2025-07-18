import { blueGrey, cyan, grey, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blueGrey[700],
      light: blueGrey[500],
      dark: blueGrey[900],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: cyan[500],
      light: cyan[300],
      dark: cyan[700],
      contrastText: '#000000',
    },
    background: {
      default: grey[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: grey[900],
      secondary: grey[600],
    },
    error: {
      main: red[600],
      light: red[300],
      dark: red[800],
      contrastText: '#fff',
    },
    grey: {
      50: grey[50],
      100: grey[100],
      200: grey[200],
      300: grey[300],
      400: grey[400],
      500: grey[500],
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
