import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useConversations } from "../../hooks/useChat";
import type { Conversation } from "../../types/chat";
import SidebarHeader from "./Header";
import SidebarSearch from "./Search";
import ConversationList from "./ConversationList";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data: conversations = [] } = useConversations();

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      navigate(`/conversations/${conversation.id}`);
    },
    [navigate]
  );

  return (
    <Paper
      elevation={1}
      sx={{
        width: 320,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "grey.200",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SidebarHeader />
      <SidebarSearch />
      <ConversationList
        conversations={conversations}
        conversationId={conversationId}
        onSelect={handleSelectConversation}
      />
    </Paper>
  );
};

export default Sidebar;
