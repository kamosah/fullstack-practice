import Paper from "@mui/material/Paper";
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useConversations } from '../../hooks/useChat';

import ConversationList from './ConversationList';
import SidebarHeader from './Header';
import SidebarSearch from './Search';

import type { Conversation } from '../../types/chat';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams() as {
    conversationId: string;
  };
  const { data: conversations = [] } = useConversations();

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      navigate(`/conversations/${conversation.id}`);
    },
    [navigate],
  );

  return (
    <Paper
      elevation={1}
      sx={{
        width: 320,
        height: '100vh',
        bgcolor: 'background.default',
        borderRight: 1,
        borderColor: 'grey.200',
        display: 'flex',
        flexDirection: 'column',
        px: 1,
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
