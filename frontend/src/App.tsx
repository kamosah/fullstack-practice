import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Uploady from "@rpldy/uploady";
import { useUploadConfig } from "./hooks/useUploadConfig";

const App: React.FC = () => {
  const uploadConfig = useUploadConfig();
  return (
    <Uploady {...uploadConfig}>
      <Box minHeight="100vh" bgcolor="grey.50">
        <Stack direction="row" height="100vh">
          <Sidebar />
          <Outlet />
        </Stack>
      </Box>
    </Uploady>
  );
};

export default App;
