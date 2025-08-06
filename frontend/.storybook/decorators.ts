import { CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { StorybookProviders } from '../src/components/ui/Providers';
import { LIGHT_THEME, DARK_THEME } from '../src/styles/themes';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
    },
    defaultTheme: 'light',
    Provider: StorybookProviders,
    GlobalStyles: CssBaseline,
  }),
];
