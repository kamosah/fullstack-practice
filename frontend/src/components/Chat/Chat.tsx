import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import type { Message, Attachment } from '../../types/chat';
import ChatInput from '../ChatInput';
import ChatMessageList from './ChatMessageList';

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
        height: hasMessages ? '100%' : 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        p: 2,
        bgcolor: 'background.paper',
        overflow: 'hidden',
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
