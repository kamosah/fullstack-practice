import {
  Box,
  Flex,
  Text,
  Input,
  VStack,
  HStack,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { LuSend, LuBot } from "react-icons/lu";
import MarkdownRenderer from "./MarkdownRenderer";
import MatrixStatus from "./MatrixStatus";
import type { Message } from "../types/chat";

interface ChatSectionProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping?: boolean;
  isDisabled?: boolean;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  onSendMessage,
  isTyping = false,
  isDisabled = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isDisabled) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isDisabled) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box h="100%" display="flex" flexDirection="column" overflow="hidden">
      {/* Header */}
      <Box p={4} borderBottom="1px" borderColor="gray.200" flexShrink={0}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            Chat
          </Text>
          <MatrixStatus />
        </Flex>
      </Box>
      {/* Messages Area */}
      <Box
        flex={1}
        overflowY="auto"
        bg="gray.50"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "3px",
          },
        }}
      >
        <VStack gap={4} align="stretch" p={4}>
          {messages.length === 0 ? (
            <Box
              textAlign="center"
              py={12}
              px={6}
              bg="blue.50"
              borderRadius="lg"
              border="2px dashed"
              borderColor="blue.200"
            >
              <VStack gap={4}>
                <Box
                  w={16}
                  h={16}
                  bg="blue.100"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LuBot size={32} color="#3182CE" />
                </Box>
                <VStack gap={2}>
                  <Heading size="md" color="blue.700">
                    Welcome to Hebbia Matrix
                  </Heading>
                  <Text
                    color="blue.600"
                    fontSize="sm"
                    textAlign="center"
                    maxW="md"
                  >
                    {isDisabled
                      ? "Select a conversation from the sidebar to start chatting."
                      : "Ask me anything about your documents. I can help you with due diligence questions, risk analysis, market insights, and strategic recommendations."}
                  </Text>
                </VStack>
              </VStack>
            </Box>
          ) : (
            messages.map((message) => (
              <Flex
                key={message.id}
                direction={message.type === "user" ? "row-reverse" : "row"}
                align="start"
                gap={3}
                className="message-enter"
              >
                <Box
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg={message.type === "user" ? "gray.300" : "blue.500"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="sm"
                  fontWeight="medium"
                  flexShrink={0}
                >
                  {message.type === "user" ? "U" : <LuBot />}
                </Box>
                <Box
                  maxW="70%"
                  bg={message.type === "user" ? "blue.500" : "gray.100"}
                  color={message.type === "user" ? "white" : "gray.800"}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  borderBottomRightRadius={
                    message.type === "user" ? "sm" : "lg"
                  }
                  borderBottomLeftRadius={
                    message.type === "agent" ? "sm" : "lg"
                  }
                >
                  {message.type === "agent" ? (
                    <MarkdownRenderer
                      markdown={message.content}
                    />
                  ) : (
                    <Text fontSize="sm" lineHeight="1.5" whiteSpace="pre-line">
                      {message.content}
                    </Text>
                  )}
                </Box>
              </Flex>
            ))
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <Flex direction="row" align="start" gap={3}>
              <Box
                w={8}
                h={8}
                borderRadius="full"
                bg="blue.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="sm"
                fontWeight="medium"
                flexShrink={0}
              >
                <LuBot />
              </Box>
              <Box
                bg="gray.100"
                px={4}
                py={3}
                borderRadius="lg"
                borderBottomLeftRadius="sm"
              >
                <HStack gap={1}>
                  <Box
                    w={2}
                    h={2}
                    bg="gray.400"
                    borderRadius="full"
                    className="typing-dot"
                  />
                  <Box
                    w={2}
                    h={2}
                    bg="gray.400"
                    borderRadius="full"
                    className="typing-dot-delay-1"
                  />
                  <Box
                    w={2}
                    h={2}
                    bg="gray.400"
                    borderRadius="full"
                    className="typing-dot-delay-2"
                  />
                </HStack>
              </Box>
            </Flex>
          )}

          <div ref={messagesEndRef} />
        </VStack>
      </Box>
      {/* Input Area */}
      <Box
        p={4}
        borderTop="1px"
        borderColor="gray.200"
        bg="white"
        flexShrink={0}
      >
        <form onSubmit={handleSubmit}>
          <Flex gap={2} align="end">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                isDisabled
                  ? "Select a conversation to start chatting..."
                  : "Type your message..."
              }
              bg="gray.50"
              border="1px"
              borderColor="gray.200"
              _hover={{ borderColor: isDisabled ? "gray.200" : "gray.300" }}
              _focus={{
                borderColor: isDisabled ? "gray.200" : "blue.500",
                boxShadow: isDisabled
                  ? "none"
                  : "0 0 0 1px var(--chakra-colors-blue-500)",
              }}
              resize="vertical"
              minH="40px"
              maxH="120px"
              disabled={isDisabled}
            />
            <IconButton
              type="submit"
              aria-label="Send message"
              colorScheme="blue"
              disabled={!inputValue.trim() || isDisabled}
              size="md"
            >
              <LuSend />
            </IconButton>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default ChatSection;
