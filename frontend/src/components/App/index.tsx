import Stack from '@mui/material/Stack';
import { Uploady } from '@rpldy/uploady';
import { Outlet } from 'react-router-dom';

import { useUploadConfig } from '../../hooks/useUploadConfig';
import Sidebar from '../Sidebar/Sidebar';

import { AppContainer } from './styles';

const App: React.FC = () => {
  const uploadConfig = useUploadConfig();
  return (
    <AppContainer>
      <Uploady {...uploadConfig}>
        <Stack direction="row" height="100vh">
          <Sidebar />
          <Outlet />
        </Stack>
      </Uploady>
    </AppContainer>
  );
};

export default App;
