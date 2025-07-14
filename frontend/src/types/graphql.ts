export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
  JSON: { input: any; output: any; }
};

export type AttachmentGQL = {
  metadata?: Maybe<Scalars['JSON']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AttachmentInput = {
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type ConversationGQL = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  messages: Array<MessageGQL>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ConversationInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentCreateInput = {
  category: Scalars['String']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type DocumentFilter = {
  category?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocumentType = {
  category: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type MessageGQL = {
  attachments?: Maybe<Array<AttachmentGQL>>;
  content: Scalars['String']['output'];
  conversationId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type MessageInput = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  content: Scalars['String']['input'];
  conversationId: Scalars['Int']['input'];
  /** Message type, must be either 'user' or 'agent' */
  type: Scalars['String']['input'];
};

export type Mutation = {
  createConversation: ConversationGQL;
  createConversationWithMessage: ConversationGQL;
  createDocument: DocumentType;
  sendMessage: MessageGQL;
};


export type MutationcreateConversationArgs = {
  input: ConversationInput;
};


export type MutationcreateConversationWithMessageArgs = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  firstMessage: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreateDocumentArgs = {
  document: DocumentCreateInput;
};


export type MutationsendMessageArgs = {
  input: MessageInput;
};

export type Query = {
  getConversation?: Maybe<ConversationGQL>;
  getConversations: Array<ConversationGQL>;
  getDocument: DocumentType;
  listDocuments: Array<DocumentType>;
};


export type QuerygetConversationArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QuerylistDocumentsArgs = {
  filter?: InputMaybe<DocumentFilter>;
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { getConversations: Array<{ id: number, title: string, createdAt: any, updatedAt: any, messages: Array<{ id: number, conversationId: number, type: string, content: string, createdAt: any, attachments?: Array<{ type: string, name: string, url: string, size?: number | null, mimeType?: string | null, metadata?: any | null }> | null }> }> };

export type GetConversationQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetConversationQuery = { getConversation?: { id: number, title: string, createdAt: any, updatedAt: any, messages: Array<{ id: number, conversationId: number, type: string, content: string, createdAt: any, attachments?: Array<{ type: string, name: string, url: string, size?: number | null, mimeType?: string | null, metadata?: any | null }> | null }> } | null };

export type CreateConversationMutationVariables = Exact<{
  input: ConversationInput;
}>;


export type CreateConversationMutation = { createConversation: { id: number, title: string, createdAt: any, updatedAt: any, messages: Array<{ id: number, conversationId: number, type: string, content: string, createdAt: any, attachments?: Array<{ type: string, name: string, url: string, size?: number | null, mimeType?: string | null, metadata?: any | null }> | null }> } };

export type CreateConversationWithMessageMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  firstMessage: Scalars['String']['input'];
  attachments?: InputMaybe<Array<AttachmentInput> | AttachmentInput>;
}>;


export type CreateConversationWithMessageMutation = { createConversationWithMessage: { id: number, title: string, createdAt: any, updatedAt: any, messages: Array<{ id: number, conversationId: number, type: string, content: string, createdAt: any, attachments?: Array<{ type: string, name: string, url: string, size?: number | null, mimeType?: string | null, metadata?: any | null }> | null }> } };

export type SendMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type SendMessageMutation = { sendMessage: { id: number, conversationId: number, type: string, content: string, createdAt: any, attachments?: Array<{ type: string, name: string, url: string, size?: number | null, mimeType?: string | null, metadata?: any | null }> | null } };

export type ListDocumentsQueryVariables = Exact<{
  filter?: InputMaybe<DocumentFilter>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type ListDocumentsQuery = { listDocuments: Array<{ id: number, title: string, content: string, category: string, createdAt: any }> };
