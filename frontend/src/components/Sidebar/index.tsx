import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetConversations } from '../../hooks/useChat';

import { SidebarRoot } from './styles';
import SidebarConversationList from './sub-components/SidebarConversationList';
import SidebarHeader from './sub-components/SidebarHeader';
import SidebarSearch from './sub-components/SidebarSearch';

import type { Conversation } from '../../types/chat';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams() as { conversationId: string };
  const { data: conversations = [] } = useGetConversations();

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      navigate(`/conversations/${conversation.id}`);
    },
    [navigate],
  );

  return (
    <SidebarRoot elevation={1} square>
      <SidebarHeader />
      <SidebarSearch />
      <SidebarConversationList
        conversations={conversations}
        conversationId={conversationId}
        onSelect={handleSelectConversation}
      />
    </SidebarRoot>
  );
};

export default Sidebar;
