import { Suspense } from 'react';

import { PageLoader } from '../shared-components/PageLoader';

export const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);
