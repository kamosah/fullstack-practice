import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Conversation } from "../types/chat";

interface SidebarItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversation: Conversation) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo(
  ({ conversation, isSelected, onSelect }) => {
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          cursor: "pointer",
          bgcolor: isSelected ? "primary.50" : "transparent",
          borderLeft: isSelected ? "3px solid" : "3px solid transparent",
          borderLeftColor: isSelected ? "primary.main" : "transparent",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: isSelected ? "primary.50" : "grey.50",
          },
        }}
        onClick={() => onSelect(conversation)}
      >
        <Typography
          variant="body2"
          fontWeight={isSelected ? 600 : 500}
          color={isSelected ? "primary.dark" : "text.primary"}
          noWrap
          mb={0.5}
        >
          {conversation.title}
        </Typography>
      </Box>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
