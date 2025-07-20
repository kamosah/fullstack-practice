import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

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
        <ListItemButton onClick={() => onSelect(conversation)} selected={isSelected}>
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
        </ListItemButton>
      </ListItem>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
