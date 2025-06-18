import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Flex h="100vh">
        <Sidebar />
        <Outlet />
      </Flex>
    </Box>
  );
};

export default App;
