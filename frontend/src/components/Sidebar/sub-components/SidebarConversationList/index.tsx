import List from '@mui/material/List';
import React from 'react';

import SidebarItem from '../SidebarItem';

import { SidebarConversationListRoot, EmptyStateContainer, SidebarListSubheader } from './styles';

import type { Conversation } from '../../../../types/chat';

interface SidebarConversationListProps {
  conversations: Conversation[];
  conversationId: string;
  onSelect: (conversation: Conversation) => void;
}

const SidebarConversationList: React.FC<SidebarConversationListProps> = ({
  conversations,
  conversationId,
  onSelect,
}) => (
  <SidebarConversationListRoot role="navigation">
    <List
      subheader={<SidebarListSubheader component="div">Recent Conversations</SidebarListSubheader>}
      sx={{ p: 0 }}
    >
      {conversations.length === 0 ? (
        <EmptyStateContainer>No conversations yet. Start a new chat!</EmptyStateContainer>
      ) : (
        conversations.map((conversation) => (
          <SidebarItem
            key={conversation.id}
            conversation={conversation}
            isSelected={conversationId === conversation.id.toString()}
            onSelect={onSelect}
          />
        ))
      )}
    </List>
  </SidebarConversationListRoot>
);

export default SidebarConversationList;
