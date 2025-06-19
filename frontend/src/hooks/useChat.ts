import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphql";
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_WITH_MESSAGE,
  SEND_MESSAGE,
} from "../graphql/queries";
import { MessageType } from "../types/chat";
import type {
  Conversation,
  ConversationInput,
  MessageInput,
  Message,
  Attachment,
} from "../types/chat";

// GraphQL response interfaces
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

// Helper functions to format data consistently
const formatMessage = (msg: GraphQLMessage): Message => ({
  ...msg,
  type: msg.type === "user" ? MessageType.USER : MessageType.AGENT,
  createdAt: new Date(msg.createdAt),
});

const formatConversation = (conv: GraphQLConversation): Conversation => ({
  ...conv,
  createdAt: new Date(conv.createdAt),
  updatedAt: new Date(conv.updatedAt),
  messages: conv.messages.map(formatMessage),
});

export const useConversations = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["conversations"],
    queryFn: async (): Promise<Conversation[]> => {
      const data = (await graphqlClient.request(GET_CONVERSATIONS)) as {
        getConversations: GraphQLConversation[];
      };

      const conversations = data.getConversations.map((conv) => {
        const conversation = formatConversation(conv);

        // Cache each individual conversation by its ID
        queryClient.setQueryData(
          ["conversations", parseInt(conv.id)],
          conversation
        );

        return conversation;
      });

      return conversations;
    },
  });
};

export const useConversation = (id: number) => {
  return useQuery({
    queryKey: ["conversations", id],
    queryFn: async (): Promise<Conversation | null> => {
      const data = (await graphqlClient.request(GET_CONVERSATION, { id })) as {
        getConversation: GraphQLConversation | null;
      };
      if (!data.getConversation) return null;

      return formatConversation(data.getConversation);
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

      return formatConversation(data.createConversation);
    },
    onSuccess: (newConversation) => {
      // Invalidate conversations list to show the new conversation
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Invalidate the specific conversation in case it's being viewed
      queryClient.invalidateQueries({
        queryKey: ["conversations", newConversation.id],
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

      return formatConversation(data.createConversationWithMessage);
    },
    onSuccess: (newConversation) => {
      // Invalidate conversations list to show the new conversation
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Invalidate the specific conversation in case it's being viewed
      queryClient.invalidateQueries({
        queryKey: ["conversations", newConversation.id],
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

      return formatMessage(data.sendMessage);
    },
    onSuccess: (message, variables) => {
      // First, optimistically update the UI with the new message
      queryClient.setQueryData(
        ["conversations", variables.conversationId],
        (oldData: Conversation | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            updatedAt: new Date(),
            messages: [...oldData.messages, message],
          };
        }
      );

      // Then invalidate both queries to trigger refetches
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversations", variables.conversationId],
      });
    },
  });
};
