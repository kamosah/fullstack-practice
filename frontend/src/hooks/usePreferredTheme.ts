import { useMediaQuery } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useMemo } from 'react';

import { DARK_THEME, LIGHT_THEME } from '../styles/themes';

export const usePreferredTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredTheme = prefersDarkMode ? DARK_THEME : LIGHT_THEME;
  const theme = useMemo(() => responsiveFontSizes(createTheme(preferredTheme)), [preferredTheme]);
  return theme;
};
