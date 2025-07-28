/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Conversation, type Message } from '../types/chat';

export const isConversation = (obj: any): obj is Conversation => {
  return obj && 'title' in obj;
};

export const isMessage = (obj: any): obj is Message => {
  return obj && 'conversationId' in obj;
};
