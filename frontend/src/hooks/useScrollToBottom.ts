import { useEffect, useCallback } from 'react';
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

export const useScrollToBottom = ({
  parentScrollRef,
  messagesEndRef,
  options = {},
}: UseScrollToBottomProps) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data: activeConversation } = useGetConversation(
    conversationId ? parseInt(conversationId) : undefined,
  );

  const scrollToBottom = useCallback(() => {
    const parent = parentScrollRef.current;
    const endNode = messagesEndRef.current;
    if (!parent || !endNode) return;
    if (options.onlyIfAtBottom) {
      const { scrollTop, scrollHeight, clientHeight } = parent;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 2;
      if (!isAtBottom) return;
    }
    endNode.scrollIntoView({
      behavior: options.behavior || 'auto',
      block: 'end',
    });
  }, [parentScrollRef, messagesEndRef, options.behavior, options.onlyIfAtBottom]);

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [activeConversation, scrollToBottom, conversationId]);

  return scrollToBottom;
};
