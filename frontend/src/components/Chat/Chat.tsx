import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import type { Message, Attachment } from '../../types/chat';
import ChatInput from './components/ChatInput';
import ChatMessageList from './components/ChatMessageList';

interface ChatProps {
  isDisabled?: boolean;
  isTyping?: boolean;
  messages: Message[];
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
}

const Chat: React.FC<ChatProps> = ({
  isDisabled = false,
  isTyping = false,
  messages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const hasMessages = messages && messages.length > 0;

  return (
    <Paper
      elevation={2}
      sx={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: hasMessages ? '100%' : 'fit-content',
        overflow: 'hidden',
        p: 2,
        width: '100%',
      }}
    >
      {hasMessages && <ChatMessageList messages={messages} isTyping={isTyping} />}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={onSendMessage}
        isDisabled={isDisabled}
      />
    </Paper>
  );
};

export default Chat;
