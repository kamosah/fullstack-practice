import React from "react";
import { Box, Text } from "@chakra-ui/react";
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
        p={2}
        borderRadius="md"
        cursor="pointer"
        bg={isSelected ? "blue.50" : "transparent"}
        borderLeft={isSelected ? "3px solid" : "3px solid transparent"}
        borderLeftColor={isSelected ? "blue.500" : "transparent"}
        _hover={{
          bg: isSelected ? "blue.50" : "gray.50",
        }}
        onClick={() => onSelect(conversation)}
        transition="all 0.2s"
      >
        <Text
          fontSize="sm"
          fontWeight={isSelected ? "semibold" : "medium"}
          color={isSelected ? "blue.700" : "gray.800"}
          lineClamp="1"
          mb={1}
        >
          {conversation.title}
        </Text>
      </Box>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
