import Stack from '@mui/material/Stack';
import React, { useEffect, useRef } from 'react';

import ChatTypingIndicator from '../ChatInputTypingIndicator';
import ChatMessageBubble from '../ChatMessageBubble';

import { MessageListContainer } from './styles';

import type { Message } from '../../../../types/chat';

const ChatMessageList: React.FC<{
  messages: Message[];
  isTyping: boolean;
}> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, isTyping]);
  return (
    <MessageListContainer>
      <Stack spacing={2} alignItems="stretch" sx={{ minHeight: 'min-content', width: '100%' }}>
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <ChatTypingIndicator />}
        <div ref={messagesEndRef} />
      </Stack>
    </MessageListContainer>
  );
};

export default ChatMessageList;
