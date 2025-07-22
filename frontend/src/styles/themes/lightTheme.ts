import { COMPONENTS_THEME } from './componentTheme';
import { TYPOGRAPHY_THEME } from './typographyTheme';

import type { ThemeOptions } from '@mui/material/styles';

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3B1334',
      light: '#5D2050',
      dark: '#2F0F29',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8D2180',
      light: '#A64296',
      dark: '#711A66',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#EEF3F3',
      paper: '#FFFFFF',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#4D4D4C',
    },
    error: {
      main: '#FF3B30',
      light: '#FF6B5C',
      dark: '#E5342A',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F5871F',
      light: '#F7A24F',
      dark: '#DC7A1C',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#8959A8',
      light: '#A179C0',
      dark: '#7A5097',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#718C00',
      light: '#8FA133',
      dark: '#667D00',
      contrastText: '#FFFFFF',
    },
    action: {
      disabledBackground: '#f3f3f3',
      disabled: '#dadada',
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
