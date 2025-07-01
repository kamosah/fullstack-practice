import { Box } from "@chakra-ui/react";
import MainContent from "./MainContent";

const ConversationView: React.FC = () => {
  return (
    <Box flex={1}>
      <MainContent />
    </Box>
  );
};

export default ConversationView;
