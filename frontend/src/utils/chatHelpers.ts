import { type Conversation, type Message } from '../types/chat';

export const isConversation = (obj: unknown): obj is Conversation => {
  return typeof obj === 'object' && obj !== null && 'title' in obj;
};
export const isMessage = (obj: unknown): obj is Message => {
  return typeof obj === 'object' && obj !== null && 'conversationId' in obj;
};
