import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, responsiveFontSizes, StyledEngineProvider } from '@mui/material/styles';
import { Uploady } from '@rpldy/uploady';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { ConversationProvider } from '../../contexts/ConversationContext';
import { useUploadConfig } from '../../hooks/useUploadConfig';
import { DARK_THEME, LIGHT_THEME } from '../../styles/themes';
import { queryClient } from '../../utils/config';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const uploadConfig = useUploadConfig();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredTheme = prefersDarkMode ? DARK_THEME : LIGHT_THEME;
  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(preferredTheme)),
    [preferredTheme],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <ConversationProvider>
            <CssBaseline />
            <Uploady {...uploadConfig}>{children}</Uploady>
            <ReactQueryDevtools initialIsOpen={false} />
          </ConversationProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
