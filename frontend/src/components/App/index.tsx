import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import { createTheme, responsiveFontSizes, StyledEngineProvider } from '@mui/material/styles';
import { Uploady } from '@rpldy/uploady';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { useUploadConfig } from '../../hooks/useUploadConfig';
import { DARK_THEME, LIGHT_THEME } from '../../styles/themes';
import Sidebar from '../Sidebar';

import { AppContainer } from './styles';

import '../../styles/fonts.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
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
          <CssBaseline />
          <AppContainer>
            <Stack
              direction="row"
              height="100%"
              alignSelf="center"
              justifySelf="center"
              width="100%"
            >
              <Sidebar />
              <Uploady {...uploadConfig}>
                <Outlet />
              </Uploady>
            </Stack>
          </AppContainer>
          <ReactQueryDevtools initialIsOpen={false} />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
