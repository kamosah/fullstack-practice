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
import { LuSearch } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { TbTableFilled } from "react-icons/tb";
import { useConversations } from "../hooks/useChat";
import type { Conversation } from "../types/chat";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data: conversations = [] } = useConversations();

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      navigate(`/conversations/${conversation.id}`);
    },
    [navigate]
  );

  return (
    <Box
      w="320px"
      h="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box p={6} borderBottom="1px" borderColor="gray.100">
        <Flex align="center" justify="space-between" mb={4}>
          <HStack
            gap={2}
            as="a"
            onClick={() => navigate("/")}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
          >
            <Icon as={TbTableFilled} boxSize={6} color="blue.500" />
            <Heading size="lg" color="gray.800">
              Hebbia
            </Heading>
          </HStack>
          <Icon
            size="md"
            colorScheme="blue"
            onClick={() => navigate("/")}
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
                <SidebarItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={conversationId === conversation.id}
                  onSelect={handleSelectConversation}
                />
              ))
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
