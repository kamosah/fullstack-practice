/**
 * Query key factories for organizing and managing React Query keys
 * This approach provides type safety and consistency across the application
 */

export const queryKeys = {
  // Conversations
  conversations: {
    all: ["conversations"] as const,
    lists: () => [...queryKeys.conversations.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.conversations.lists(), { filters }] as const,
    details: () => [...queryKeys.conversations.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.conversations.details(), id] as const,
  },

  // Messages (if needed separately in the future)
  messages: {
    all: ["messages"] as const,
    lists: () => [...queryKeys.messages.all, "list"] as const,
    list: (conversationId: number) =>
      [...queryKeys.messages.lists(), { conversationId }] as const,
    details: () => [...queryKeys.messages.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.messages.details(), id] as const,
  },

  // Mutations
  mutations: {
    createConversation: ["createConversation"] as const,
    createConversationWithMessage: ["createConversationWithMessage"] as const,
    sendMessage: ["sendMessage"] as const,
  },
} as const;

/**
 * Type-safe query key utilities
 */
export type QueryKeys = typeof queryKeys;
export type ConversationQueryKeys = typeof queryKeys.conversations;
export type MessageQueryKeys = typeof queryKeys.messages;
export type MutationKeys = typeof queryKeys.mutations;
