import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ConversationView from "./components/ConversationView";

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
