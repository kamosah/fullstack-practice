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

export type Mutation = {
  createDocument: DocumentType;
};


export type MutationcreateDocumentArgs = {
  document: DocumentCreateInput;
};

export type Query = {
  getDocument: DocumentType;
  listDocuments: Array<DocumentType>;
};


export type QuerygetDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QuerylistDocumentsArgs = {
  filter?: InputMaybe<DocumentFilter>;
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type ListDocumentsQueryVariables = Exact<{
  filter?: InputMaybe<DocumentFilter>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type ListDocumentsQuery = { listDocuments: Array<{ id: number, title: string, content: string, category: string, createdAt: any }> };
