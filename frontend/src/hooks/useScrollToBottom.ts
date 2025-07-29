import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetConversation } from './useChat';

interface UseScrollToBottomProps {
  parentScrollRef: React.RefObject<HTMLElement>;
  messagesEndRef: React.RefObject<HTMLElement>;
  options?: {
    behavior?: ScrollBehavior;
    onlyIfAtBottom?: boolean;
  };
}

export function useScrollToBottom({
  parentScrollRef,
  messagesEndRef,
  options = {},
}: UseScrollToBottomProps) {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data: activeConversation } = useGetConversation(
    conversationId ? parseInt(conversationId) : undefined,
  );
  useEffect(() => {
    const parent = parentScrollRef.current;
    const endNode = messagesEndRef.current;

    if (!parent || !endNode) return;

    if (options.onlyIfAtBottom) {
      const { scrollTop, scrollHeight, clientHeight } = parent;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 2;
      if (!isAtBottom) return;
    }

    setTimeout(() => {
      endNode.scrollIntoView({
        behavior: options.behavior || 'auto',
        block: 'end',
      });
    }, 100);
  }, [
    activeConversation,
    parentScrollRef,
    messagesEndRef,
    options.behavior,
    options.onlyIfAtBottom,
    conversationId,
  ]);
}
