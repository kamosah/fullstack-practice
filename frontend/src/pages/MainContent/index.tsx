import Box from '@mui/material/Box';
import Chat from '../../components/Chat/Chat';
import { MessageType, type Attachment } from '../../types/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  useConversation,
  useCreateConversationWithMessage,
  useSendMessage,
} from '../../hooks/useChat';

const MainContent: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  const { data: activeConversation, isLoading } = useConversation(
    conversationId ? parseInt(conversationId) : 0,
  );

  const createConversationWithMessageMutation = useCreateConversationWithMessage();
  const sendMessageMutation = useSendMessage();

  const onSendMessage = async (message: string, attachments?: Attachment[]) => {
    if (!activeConversation) {
      try {
        setIsTyping(true);
        const newConversation = await createConversationWithMessageMutation.mutateAsync({
          title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
          firstMessage: message,
          attachments,
        });
        navigate(`/conversations/${newConversation.id}`);
      } catch (error) {
        console.error('Failed to create conversation:', error);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    try {
      setIsTyping(true);
      await sendMessageMutation.mutateAsync({
        conversationId: parseInt(activeConversation.id),
        type: MessageType.USER,
        content: message,
        attachments: attachments?.map((att) => ({
          type: att.type,
          name: att.name,
          url: att.url,
          size: att.size,
          mimeType: att.mimeType,
          metadata: att.metadata,
        })),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: activeConversation?.messages ? 'flex-end' : 'center',
          width: {
            xs: '100%',
            sm: '90%',
            md: '66.6667%',
            lg: '60%',
            xl: '50%',
          },
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        <Chat
          messages={activeConversation?.messages ?? []}
          onSendMessage={onSendMessage}
          isTyping={isTyping}
          isDisabled={isLoading}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
