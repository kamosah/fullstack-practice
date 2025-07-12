import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SidebarItem from "../SidebarItem";
import type { Conversation } from "../../types/chat";

interface ConversationListProps {
  conversations: Conversation[];
  conversationId?: string;
  onSelect: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  conversationId,
  onSelect,
}) => (
  <Box sx={{ flex: 1, overflowY: "auto" }}>
    <Box sx={{ p: 3 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        fontWeight={500}
        mb={2}
      >
        Recent Conversations
      </Typography>
      <Stack spacing={1} alignItems="stretch">
        {conversations.length === 0 ? (
          <Box
            sx={{ p: 3, textAlign: "center", color: "grey.500", fontSize: 14 }}
          >
            No conversations yet. Start a new chat!
          </Box>
        ) : (
          conversations.map((conversation) => (
            <SidebarItem
              key={conversation.id}
              conversation={conversation}
              isSelected={conversationId === conversation.id}
              onSelect={onSelect}
            />
          ))
        )}
      </Stack>
    </Box>
  </Box>
);

export default ConversationList;
