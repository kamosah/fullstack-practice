import { ThemeProvider, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Uploady } from '@rpldy/uploady';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type FC, type PropsWithChildren } from 'react';

import { ConversationProvider } from '../../../contexts/ConversationContext';
import { composeProviders } from '../../../hocs/composeProviders';
import { usePreferredTheme } from '../../../hooks/usePreferredTheme';
import { useUploadConfig } from '../../../hooks/useUploadConfig';
import { queryClient } from '../../../utils/config';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  const uploadConfig = useUploadConfig();
  const theme = usePreferredTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <ConversationProvider>
            <Uploady {...uploadConfig}>
              <CssBaseline />
              <ReactQueryDevtools initialIsOpen={false} />
              {children}
            </Uploady>
          </ConversationProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export const StorybookProviders: FC<PropsWithChildren> = ({ children }) => {
  const theme = usePreferredTheme();
  const StorybookProvider = composeProviders(
    { Provider: ThemeProvider, props: { theme } },
    { Provider: StyledEngineProvider, props: { injectFirst: true } },
    { Provider: CssBaseline },
  );
  return <StorybookProvider>{children}</StorybookProvider>;
};

export default AppProviders;
