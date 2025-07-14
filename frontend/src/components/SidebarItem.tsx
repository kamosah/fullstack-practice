import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Conversation } from '../types/chat';

interface SidebarItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversation: Conversation) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo(
  ({ conversation, isSelected, onSelect }) => {
    return (
      <ListItem
        disablePadding
        sx={{
          bgcolor: 'transparent',
        }}
      >
        <ListItemButton
          onClick={() => onSelect(conversation)}
          selected={isSelected}
          sx={(theme) => ({
            borderRadius: 1,
            my: 0.25,
            pl: 1,
            pr: 1,
            py: 0.5,
            borderLeft: '3px solid',
            borderLeftColor: isSelected ? theme.palette.primary.dark : 'transparent',
            transition: 'all 0.2s',
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '&.Mui-selected, &.Mui-selected:hover': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderLeftColor: theme.palette.primary.dark,
            },
            '&:hover': {
              bgcolor: theme.palette.grey[200],
            },
          })}
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
        </ListItemButton>
      </ListItem>
    );
  },
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
