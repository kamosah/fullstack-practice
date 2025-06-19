// Define as a const object
export const MessageType = {
  USER: "user",
  AGENT: "agent",
} as const;

// Create a type from the values of the MessageType object
export type MessageTypeValue = (typeof MessageType)[keyof typeof MessageType];

export interface Attachment {
  type: "text" | "image" | "file" | "document";
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, unknown>;
}

export interface Message {
  id: string;
  conversationId: string;
  type: MessageTypeValue;
  content: string;
  attachments?: Attachment[];
  createdAt: Date;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface ConversationInput {
  title?: string;
}

export interface MessageInput {
  conversationId: number;
  type: MessageTypeValue;
  content: string;
  attachments?: Record<string, unknown>[];
}
