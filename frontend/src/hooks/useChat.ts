import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphql";
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_WITH_MESSAGE,
  SEND_MESSAGE,
} from "../graphql/queries";
import type {
  Conversation,
  ConversationInput,
  MessageInput,
  Message,
  Attachment,
} from "../types/chat";

interface GraphQLConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: GraphQLMessage[];
}

interface GraphQLMessage {
  id: string;
  conversationId: string;
  type: string;
  content: string;
  attachments?: Attachment[];
  createdAt: string;
}

export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async (): Promise<Conversation[]> => {
      const data = (await graphqlClient.request(GET_CONVERSATIONS)) as {
        getConversations: GraphQLConversation[];
      };
      return data.getConversations.map((conv: GraphQLConversation) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: GraphQLMessage) => ({
          ...msg,
          type: msg.type as "user" | "agent",
          createdAt: new Date(msg.createdAt),
        })),
      }));
    },
  });
};

export const useConversation = (id: number) => {
  return useQuery({
    queryKey: ["conversation", id],
    queryFn: async (): Promise<Conversation | null> => {
      const data = (await graphqlClient.request(GET_CONVERSATION, { id })) as {
        getConversation: GraphQLConversation | null;
      };
      if (!data.getConversation) return null;

      const conv = data.getConversation;
      return {
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: GraphQLMessage) => ({
          ...msg,
          type: msg.type as "user" | "agent",
          createdAt: new Date(msg.createdAt),
        })),
      };
    },
    enabled: !!id,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createConversation"],
    mutationFn: async (input: ConversationInput): Promise<Conversation> => {
      const data = (await graphqlClient.request(CREATE_CONVERSATION, {
        input,
      })) as { createConversation: GraphQLConversation };
      const conv = data.createConversation;
      return {
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: GraphQLMessage) => ({
          ...msg,
          type: msg.type as "user" | "agent",
          createdAt: new Date(msg.createdAt),
        })),
      };
    },
    onSuccess: (newConversation) => {
      // Invalidate conversations list to show the new conversation
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Invalidate the specific conversation in case it's being viewed
      queryClient.invalidateQueries({
        queryKey: ["conversation", newConversation.id],
      });
    },
  });
};

export const useCreateConversationWithMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createConversationWithMessage"],
    mutationFn: async (input: {
      title?: string;
      firstMessage: string;
    }): Promise<Conversation> => {
      const data = (await graphqlClient.request(
        CREATE_CONVERSATION_WITH_MESSAGE,
        {
          title: input.title,
          firstMessage: input.firstMessage,
        }
      )) as { createConversationWithMessage: GraphQLConversation };
      const conv = data.createConversationWithMessage;
      return {
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: GraphQLMessage) => ({
          ...msg,
          type: msg.type as "user" | "agent",
          createdAt: new Date(msg.createdAt),
        })),
      };
    },
    onSuccess: (newConversation) => {
      // Invalidate conversations list to show the new conversation
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Invalidate the specific conversation in case it's being viewed
      queryClient.invalidateQueries({
        queryKey: ["conversation", newConversation.id],
      });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (input: MessageInput): Promise<Message> => {
      const data = (await graphqlClient.request(SEND_MESSAGE, { input })) as {
        sendMessage: GraphQLMessage;
      };
      const msg = data.sendMessage;
      return {
        ...msg,
        type: msg.type as "user" | "agent",
        createdAt: new Date(msg.createdAt),
      };
    },
    onSuccess: (_, variables) => {
      // Invalidate conversations list to update message counts/timestamps
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Invalidate the specific conversation to show the new message
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId],
      });
    },
  });
};
