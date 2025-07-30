import Stack from '@mui/material/Stack';
import React from 'react';

import { useConversation } from '../../../../hooks/useConversation';
import { Layout } from '../../../../styles/layout';
import ChatTypingIndicator from '../ChatInputTypingIndicator';
import ChatMessageBubble from '../ChatMessageBubble';

import { MessageListContainer } from './styles';

import type { Message } from '../../../../types/chat';

const ChatMessageList: React.FC<{
  messages: Message[];
}> = ({ messages }) => {
  const { isGetConversationLoading, isAddingMessagePending } = useConversation();
  const isTyping = isGetConversationLoading || isAddingMessagePending;
  return (
    <MessageListContainer px={2} pt={2} pb={Layout.chatInputHeight}>
      <Stack spacing={2} alignItems="stretch" sx={{ minHeight: 'min-content', width: '100%' }}>
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <ChatTypingIndicator />}
      </Stack>
    </MessageListContainer>
  );
};

export default ChatMessageList;
