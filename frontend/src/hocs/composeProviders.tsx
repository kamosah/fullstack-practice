import { type ReactNode, type ComponentType } from 'react';

type ProviderProps = {
  children: ReactNode;
};

type Provider = ComponentType<ProviderProps>;

export type ProviderWithProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Provider: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
};

export const composeProviders = (...providersWithProps: ProviderWithProps[]) => {
  return providersWithProps.reduce(
    (AccumulatedProviders: Provider, CurrentProviderWithProps: ProviderWithProps): Provider =>
      ({ children }: ProviderProps) => {
        const { Provider: CurrentProvider, props = {} } = CurrentProviderWithProps;
        return (
          <AccumulatedProviders>
            <CurrentProvider {...props}>{children}</CurrentProvider>
          </AccumulatedProviders>
        );
      },
    ({ children }: ProviderProps) => <>{children}</>,
  );
};
