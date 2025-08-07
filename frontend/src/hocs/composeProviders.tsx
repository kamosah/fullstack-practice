import { type ReactNode, type ComponentType } from 'react';

type ProviderProps = {
  children: ReactNode;
};

type Provider = ComponentType<ProviderProps>;

export type ProviderWithProps<P = object> = {
  Provider: React.ComponentType<P>;
  props?: P;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const composeProviders = (...providersWithProps: ProviderWithProps<any>[]) => {
  return providersWithProps.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (AccumulatedProviders: Provider, CurrentProviderWithProps: ProviderWithProps<any>): Provider =>
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
