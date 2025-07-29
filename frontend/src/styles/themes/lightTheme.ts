import { COMPONENTS_THEME } from './componentTheme';
import { CUSTOM_UTILS } from './customUtils';
import { TYPOGRAPHY_THEME } from './typographyTheme';

import type { ThemeOptions } from '@mui/material/styles';

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1E7582',
      light: '#E8F1F2',
      dark: '#142E34',
      contrastText: '#FEFEFA',
    },
    secondary: {
      main: '#7E4F9E',
      light: '#F1EEFD',
      dark: '#55686C',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#668100',
      light: '#E5E5DF',
      dark: '#444443',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FBFCF8',
      paper: '#F1F1EB',
    },
    text: {
      primary: '#142E34',
      secondary: '#55686C',
      disabled: '#AAB2B5',
    },
    divider: '#E5E5E2',
    action: {
      active: '#1E7582',
      hover: 'rgba(30,117,130,0.08)',
      selected: 'rgba(30,117,130,0.16)',
      disabled: 'rgba(68,68,67,0.38)',
      disabledBackground: 'rgba(229,229,226,0.12)',
      focus: 'rgba(30,117,130,0.24)',
    },
    error: {
      main: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',
      contrastText: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    ...TYPOGRAPHY_THEME,
  },
  components: {
    ...COMPONENTS_THEME,
  },
  ...CUSTOM_UTILS,
};
