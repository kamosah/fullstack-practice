import Box from '@mui/material/Box';

import ChatInput from '../../components/Chat/sub-components/ChatInput';
import ChatTypingIndicator from '../../components/Chat/sub-components/ChatInputTypingIndicator';
import { useConversation } from '../../hooks/useConversation';
import { ResponsiveChatWidth } from '../../styles/layout';

import { HomeContainer } from './styles';

export const HomeView: React.FC = () => {
  const { isCreatingConversationPending } = useConversation();
  return (
    <HomeContainer
      sx={{
        width: ResponsiveChatWidth,
      }}
    >
      <Box mb={3}>{isCreatingConversationPending && <ChatTypingIndicator />}</Box>
      <ChatInput />
    </HomeContainer>
  );
};

export default HomeView;
