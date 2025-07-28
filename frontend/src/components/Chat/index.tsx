import Box from '@mui/material/Box';
import React, { useRef } from 'react';

import { useConversation } from '../../hooks/useConversation';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';

import { ChatContainer } from './styles';
import ChatMessageList from './sub-components/ChatMessageList';

interface ChatProps {
  parentScrollRef: React.RefObject<HTMLDivElement>;
}

const Chat: React.FC<ChatProps> = ({ parentScrollRef }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const { activeConversation } = useConversation();
  useScrollToBottom({
    parentScrollRef,
    messagesEndRef,
    options: { behavior: 'smooth' },
  });

  if (!activeConversation?.messages?.length) {
    return <div>No conversation found</div>;
  }
  return (
    <ChatContainer>
      <ChatMessageList messages={activeConversation?.messages ?? []} />
      <Box py={12} ref={messagesEndRef} />
    </ChatContainer>
  );
};

export default Chat;
