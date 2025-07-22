import Stack from '@mui/material/Stack';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';

import AppProviders from './AppProviders';
import { AppContainer } from './styles';

import '../../styles/fonts.css';

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppContainer>
        <Stack direction="row" height="100%" alignSelf="center" justifySelf="center" width="100%">
          <Sidebar />
          <Outlet />
        </Stack>
      </AppContainer>
    </AppProviders>
  );
};

export default App;
