import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { SidebarListItemButton } from './styles';

import type { Conversation } from '../../../../types/chat';

interface SidebarItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversation: Conversation) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo(
  ({ conversation, isSelected, onSelect }) => {
    return (
      <ListItem disablePadding sx={{ bgcolor: 'transparent' }}>
        <SidebarListItemButton
          onClick={() => onSelect(conversation)}
          selected={isSelected}
          isSelected={isSelected}
        >
          <ListItemText
            primary={conversation.title}
            slotProps={{
              primary: {
                variant: 'body2',
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'primary.contrastText' : 'text.primary',
                noWrap: true,
              },
            }}
          />
        </SidebarListItemButton>
      </ListItem>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
