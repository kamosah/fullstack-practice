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
  type: "user" | "agent";
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
  title: string;
}

export interface MessageInput {
  conversationId: number;
  type: string;
  content: string;
  attachments?: Record<string, unknown>[];
}
