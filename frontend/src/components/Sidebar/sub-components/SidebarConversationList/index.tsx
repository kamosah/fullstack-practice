import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React from 'react';

import SidebarItem from '../SidebarItem';

import { SidebarConversationListRoot, EmptyStateContainer } from './styles';

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
  <SidebarConversationListRoot>
    <List
      subheader={
        <ListSubheader component="div" sx={{ bgcolor: 'background.paper', fontWeight: 500 }}>
          Recent Conversations
        </ListSubheader>
      }
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
