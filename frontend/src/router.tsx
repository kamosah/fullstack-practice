import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { withSuspense } from './hocs';

const ConversationView = lazy(() => import('./pages/ConversationView'));
const HomeView = lazy(() => import('./pages/HomeView'));

const App = lazy(() => import('./components/App'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(App),
    children: [
      {
        index: true,
        element: withSuspense(HomeView),
      },
      {
        path: 'conversations/:conversationId',
        element: withSuspense(ConversationView),
      },
    ],
  },
]);
