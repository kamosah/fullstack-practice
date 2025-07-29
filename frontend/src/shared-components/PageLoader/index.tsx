import CircularProgress from '@mui/material/CircularProgress';

import { PageLoaderContainer } from './styles';

export const PageLoader = () => (
  <PageLoaderContainer>
    <CircularProgress color="primary" size={48} thickness={4} />
  </PageLoaderContainer>
);

export default PageLoader;
