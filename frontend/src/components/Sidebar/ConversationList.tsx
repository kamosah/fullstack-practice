import React from "react";
import Box from "@mui/material/Box";

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import SidebarItem from '../SidebarItem';
import type { Conversation } from '../../types/chat';

interface ConversationListProps {
  conversations: Conversation[];
  conversationId: string;
  onSelect: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  conversationId,
  onSelect,
}) => (
  <Box sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
    <List
      subheader={
        <ListSubheader component="div" sx={{ bgcolor: 'background.paper', fontWeight: 500 }}>
          Recent Conversations
        </ListSubheader>
      }
      sx={{ p: 0 }}
    >
      {conversations.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center', color: 'grey.500', fontSize: 14 }}>
          No conversations yet. Start a new chat!
        </Box>
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
  </Box>
);

export default ConversationList;
