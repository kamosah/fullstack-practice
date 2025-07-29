import React from 'react';

import Chat from '../../components/Chat';
import ChatInput from '../../components/Chat/sub-components/ChatInput';
import { ResponsiveChatWidth } from '../../styles/layout';

import { ConversationArea } from './styles';

export const ConversationView: React.FC = () => {
  const parentScrollRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  return (
    <ConversationArea
      ref={parentScrollRef}
      sx={{
        width: ResponsiveChatWidth,
      }}
    >
      <Chat parentScrollRef={parentScrollRef} />
      <ChatInput />
    </ConversationArea>
  );
};

export default ConversationView;
