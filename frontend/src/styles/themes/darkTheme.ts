import { COMPONENTS_THEME } from './componentTheme';
import { TYPOGRAPHY_THEME } from './typographyTheme';

import type { ThemeOptions } from '@mui/material/styles';

export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#7E2D6C',
      light: '#9F3A88',
      dark: '#5D2050',
      contrastText: '#EEF3F3',
    },
    secondary: {
      main: '#A64296',
      light: '#BF62AC',
      dark: '#8D2180',
      contrastText: '#EEF3F3',
    },
    background: {
      default: '#070412',
      paper: '#1A1625',
    },
    text: {
      primary: '#EEF3F3',
      secondary: '#E6E8E8',
    },
    error: {
      main: '#FF6B5C',
      light: '#FF8A7A',
      dark: '#FF3B30',
      contrastText: '#EEF3F3',
    },
    warning: {
      main: '#F7A24F',
      light: '#F9B36F',
      dark: '#F5871F',
      contrastText: '#070412',
    },
    info: {
      main: '#A179C0',
      light: '#B18FD0',
      dark: '#8959A8',
      contrastText: '#EEF3F3',
    },
    success: {
      main: '#8FA133',
      light: '#A3B055',
      dark: '#718C00',
      contrastText: '#070412',
    },
    grey: {
      50: '#070412',
      100: '#1A1625',
      200: '#2A2937',
      300: '#3A3A39',
      400: '#4D4D4C',
      500: '#8E908C',
      600: '#B0B2AE',
      700: '#D2D4D0',
      800: '#E6E8E8',
      900: '#EEF3F3',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    ...TYPOGRAPHY_THEME,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          body {
            font-family: 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          }
        `,
    },
    ...COMPONENTS_THEME,
  },
};
