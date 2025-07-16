import React, { useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import ChatMessageBubble from './ChatMessageBubble';
import ChatTypingIndicator from './ChatTypingIndicator';
import type { Message } from '../../../types/chat';
import Box from '@mui/material/Box';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        px: 2,
        py: 2,
        position: 'relative',
        flex: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c1c1c1',
          borderRadius: '3px',
        },
      }}
    >
      <Stack spacing={2} alignItems="stretch" sx={{ minHeight: 'min-content', width: '100%' }}>
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <ChatTypingIndicator />}
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
};

export default ChatMessageList;
