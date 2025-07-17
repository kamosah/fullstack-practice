import React, { useState } from 'react';

import { ChatContainer } from './styles';
import ChatInput from './sub-components/ChatInput';
import ChatMessageList from './sub-components/ChatMessageList';

import type { Message, Attachment } from '../../types/chat';

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
    <ChatContainer sx={{ height: hasMessages ? '100%' : 'fit-content' }}>
      {hasMessages && <ChatMessageList messages={messages} isTyping={isTyping} />}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={onSendMessage}
        isDisabled={isDisabled}
      />
    </ChatContainer>
  );
};

export default Chat;
