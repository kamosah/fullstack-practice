import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { LuSearch, LuMessageSquare } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import type { Conversation } from "../types/chat";

interface SidebarProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
  activeConversation: Conversation | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  onSelectConversation,
  onNewConversation,
  activeConversation,
}) => {
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  return (
    <Box
      w="320px"
      h="100vh"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box p={6} borderBottom="1px" borderColor="gray.100">
        <Flex align="center" justify="space-between" mb={4}>
          <HStack gap={2}>
            <Icon as={LuMessageSquare} boxSize={6} color="blue.500" />
            <Heading size="lg" color="gray.800">
              Hebbia
            </Heading>
          </HStack>
          <Icon
            size="md"
            colorScheme="blue"
            onClick={onNewConversation}
            cursor="pointer"
          >
            <FaRegEdit />
          </Icon>
        </Flex>

        {/* Search */}
        <Box position="relative">
          <Input
            placeholder="Search conversations"
            pl={10}
            bg="gray.50"
            border="1px"
            borderColor="gray.200"
            _hover={{ borderColor: "gray.300" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
          />
          <Icon
            as={LuSearch}
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            boxSize={4}
          />
        </Box>
      </Box>

      {/* Conversations List */}
      <Box flex={1} overflowY="auto">
        <Box p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Recent Conversations
          </Text>
          <VStack gap={1} align="stretch">
            {conversations.length === 0 ? (
              <Box p={4} textAlign="center" color="gray.500" fontSize="sm">
                No conversations yet. Start a new chat!
              </Box>
            ) : (
              conversations.map((conversation) => (
                <Box
                  key={conversation.id}
                  p={3}
                  borderRadius="md"
                  cursor="pointer"
                  bg={
                    activeConversation?.id === conversation.id
                      ? "blue.50"
                      : "transparent"
                  }
                  borderLeft={
                    activeConversation?.id === conversation.id
                      ? "3px solid"
                      : "3px solid transparent"
                  }
                  borderLeftColor={
                    activeConversation?.id === conversation.id
                      ? "blue.500"
                      : "transparent"
                  }
                  _hover={{
                    bg:
                      activeConversation?.id === conversation.id
                        ? "blue.50"
                        : "gray.50",
                  }}
                  onClick={() => onSelectConversation(conversation)}
                  transition="all 0.2s"
                >
                  <Text
                    fontSize="sm"
                    fontWeight={
                      activeConversation?.id === conversation.id
                        ? "semibold"
                        : "medium"
                    }
                    color={
                      activeConversation?.id === conversation.id
                        ? "blue.700"
                        : "gray.800"
                    }
                    lineClamp={2}
                    mb={1}
                  >
                    {conversation.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatRelativeTime(conversation.updatedAt)}
                    {conversation.messages.length > 0 && (
                      <> • {conversation.messages.length} messages</>
                    )}
                  </Text>
                </Box>
              ))
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
