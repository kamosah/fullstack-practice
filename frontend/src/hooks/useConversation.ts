import { useContext, createContext } from 'react';

import { type Attachment, type Conversation, type Message } from '../types/chat';

interface ConversationContextState {
  addMessage: (message: string, attachments?: Attachment[]) => Promise<Message | undefined>;
  createConversation: (title: string) => Promise<Conversation | undefined>;
  activeConversation?: Conversation | null;
  isCreatingConversationPending: boolean;
  isGetConversationLoading: boolean;
  isAddingMessagePending: boolean;
}

export const ConversationContext = createContext<ConversationContextState | undefined>(undefined);

export const useConversation = (): ConversationContextState => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};
