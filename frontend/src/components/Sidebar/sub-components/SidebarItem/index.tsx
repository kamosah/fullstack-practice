import { Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
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
      <Tooltip title={conversation.title} placement="right">
        <ListItem disablePadding sx={{ bgcolor: 'transparent' }}>
          <ListItemButton onClick={() => onSelect(conversation)} selected={isSelected}>
            <Typography></Typography>
            <ListItemText
              primary={conversation.title}
              slotProps={{
                primary: {
                  variant: 'body2',
                  color: isSelected ? 'primary.contrastText' : 'text.primary',
                  noWrap: true,
                },
              }}
              sx={{ fontWeight: isSelected ? 600 : 500 }}
            />
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  },
);

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
