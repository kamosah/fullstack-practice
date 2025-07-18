import { createBrowserRouter } from "react-router-dom";

import App from './components/App';
import ConversationView from './pages/ConversationView';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ConversationView />,
      },
      {
        path: "conversations/:conversationId",
        element: <ConversationView />,
      },
    ],
  },
]);
