import {
  Box,
  Flex,
  Text,
  Input,
  VStack,
  HStack,
  InputGroup,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { LuBot } from "react-icons/lu";
import { AiOutlineUpload } from "react-icons/ai";
import { PiArrowElbowRightUp } from "react-icons/pi";
import MarkdownRenderer from "./MarkdownRenderer";
import MatrixStatus from "./MatrixStatus";
import { MessageType } from "../types/chat";
import type { Message } from "../types/chat";

interface ChatProps {
  isDisabled?: boolean;
  isTyping?: boolean;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const Chat: React.FC<ChatProps> = ({
  isDisabled = false,
  isTyping = false,
  messages,
  onSendMessage,
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

  const handleUpload = () => {
    // Handle file upload logic here
    console.log("Upload button clicked");
  };

  return (
    <Box
      h="100%"
      display="flex"
      flexDirection="column"
      overflowY="hidden"
      borderRadius="md"
      borderStyle="solid"
      borderWidth="1px"
      bg="white"
      p={3}
    >
      {/* Header */}
      <Box borderBottom="1px" borderColor="gray.200" flexShrink={0}>
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
          {messages.map((message) => (
            <Flex
              key={message.id}
              align="start"
              gap={3}
              className="message-enter"
            >
              <Box
                w={8}
                h={8}
                borderRadius="full"
                bg={message.type === MessageType.USER ? "gray.300" : "blue.500"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="sm"
                fontWeight="medium"
                flexShrink={0}
              >
                {message.type === MessageType.USER ? "U" : <LuBot />}
              </Box>
              <Box
                maxW="70%"
                bg={message.type === MessageType.USER ? "blue.500" : "gray.100"}
                color={message.type === MessageType.USER ? "white" : "gray.800"}
                px={4}
                py={3}
                borderRadius="lg"
                borderBottomRightRadius={
                  message.type === MessageType.USER ? "sm" : "lg"
                }
                borderBottomLeftRadius={
                  message.type === MessageType.AGENT ? "sm" : "lg"
                }
              >
                {message.type === MessageType.AGENT ? (
                  <MarkdownRenderer markdown={message.content} />
                ) : (
                  <Text fontSize="sm" lineHeight="1.5" whiteSpace="pre-line">
                    {message.content}
                  </Text>
                )}
              </Box>
            </Flex>
          ))}

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
          <Flex gap={2} align="end" bg="white">
            <InputGroup
              startElement={
                <AiOutlineUpload
                  aria-label="Upload file"
                  onClick={handleUpload}
                />
              }
              endElement={
                <PiArrowElbowRightUp
                  aria-label="Send message"
                  // disabled={isDisabled || !inputValue.trim()}
                  onClick={handleSubmit}
                />
              }
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Anything..."
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
            </InputGroup>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
