import React, { type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import {
  useCreateConversationWithMessage,
  useSendMessage,
  useGetConversation,
} from '../hooks/useChat';
import { ConversationContext } from '../hooks/useConversation';
import { type Attachment, type Conversation, type Message, MessageType } from '../types/chat';

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({ children }) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data: activeConversation, isLoading: isLoadingActiveConversation } = useGetConversation(
    conversationId ? parseInt(conversationId) : undefined,
  );
  const createConversationMutation = useCreateConversationWithMessage();
  const addMessageMutation = useSendMessage();

  const isLoading =
    createConversationMutation.isPending ||
    addMessageMutation.isPending ||
    isLoadingActiveConversation;

  const createConversation = async (
    message: string,
    attachments?: Attachment[],
  ): Promise<Conversation | undefined> => {
    try {
      const newConversation = await createConversationMutation.mutateAsync({
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        firstMessage: message,
        attachments,
      });
      return newConversation;
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const addMessage = async (
    message: string,
    attachments?: Attachment[],
  ): Promise<Message | undefined> => {
    if (!activeConversation) {
      console.error('Cannot send message: activeConversation is undefined.');
      return;
    }
    try {
      return await addMessageMutation.mutateAsync({
        conversationId: parseInt(activeConversation.id),
        type: MessageType.USER,
        content: message,
        attachments: attachments?.map((att) => ({
          type: att.type,
          name: att.name,
          url: att.url,
          size: att.size,
          mimeType: att.mimeType,
          metadata: att.metadata,
        })),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        activeConversation,
        addMessage,
        createConversation,
        isLoading,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
