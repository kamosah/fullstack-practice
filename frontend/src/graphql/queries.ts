import { gql } from "graphql-request";

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
      id
      title
      createdAt
      updatedAt
      messages {
        id
        conversationId
        type
        content
        attachments {
          type
          name
          url
          size
          mimeType
          metadata
        }
        createdAt
      }
    }
  }
`;

export const GET_CONVERSATION = gql`
  query GetConversation($id: Int!) {
    getConversation(id: $id) {
      id
      title
      createdAt
      updatedAt
      messages {
        id
        conversationId
        type
        content
        attachments {
          type
          name
          url
          size
          mimeType
          metadata
        }
        createdAt
      }
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($input: ConversationInput!) {
    createConversation(input: $input) {
      id
      title
      createdAt
      updatedAt
      messages {
        id
        conversationId
        type
        content
        attachments {
          type
          name
          url
          size
          mimeType
          metadata
        }
        createdAt
      }
    }
  }
`;

export const CREATE_CONVERSATION_WITH_MESSAGE = gql`
  mutation CreateConversationWithMessage(
    $title: String
    $firstMessage: String!
    $attachments: [AttachmentInput!]
  ) {
    createConversationWithMessage(
      title: $title
      firstMessage: $firstMessage
      attachments: $attachments
    ) {
      id
      title
      createdAt
      updatedAt
      messages {
        id
        conversationId
        type
        content
        attachments {
          type
          name
          url
          size
          mimeType
          metadata
        }
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      id
      conversationId
      type
      content
      attachments {
        type
        name
        url
        size
        mimeType
        metadata
      }
      createdAt
    }
  }
`;
