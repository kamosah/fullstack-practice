import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { LuBot } from "react-icons/lu";
import {
  AiOutlineFile,
  AiOutlineFilePdf,
  AiOutlineFileText,
} from "react-icons/ai";
import Uploady from "@rpldy/uploady";
import MarkdownRenderer from "./MarkdownRenderer";
import MatrixStatus from "./MatrixStatus";
import { MessageType } from "../types/chat";
import type { Message, Attachment } from "../types/chat";
import { useUploadConfig, formatFileSize } from "../hooks/useUploadConfig";
import ChatInput from "./ChatInput";

interface ChatProps {
  isDisabled?: boolean;
  isTyping?: boolean;
  messages: Message[];
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
}

const Chat: React.FC<ChatProps> = ({
  isDisabled = false,
  isTyping = false,
  messages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const uploadConfig = useUploadConfig();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return <AiOutlineFilePdf size={16} color="#dc2626" />;
    } else if (mimeType === "text/plain") {
      return <AiOutlineFileText size={16} color="#059669" />;
    } else {
      return <AiOutlineFile size={16} color="#6b7280" />;
    }
  };

  const renderAttachments = (attachments: Attachment[]) => {
    if (!attachments || attachments.length === 0) return null;
    return (
      <Box mt={2}>
        <Flex wrap="wrap" gap={2}>
          {attachments.map((attachment, index) => (
            <Box
              key={index}
              bg="gray.50"
              borderRadius="6px"
              border="1px"
              borderColor="gray.200"
              p={2}
              maxW="200px"
            >
              {attachment.type === "image" ? (
                <Box>
                  <Image
                    src={attachment.url}
                    alt={attachment.name}
                    maxH="100px"
                    objectFit="cover"
                    borderRadius="4px"
                    mb={1}
                  />
                  <Text fontSize="xs" color="gray.600" truncate>
                    {attachment.name}
                  </Text>
                  {attachment.size && (
                    <Text fontSize="xs" color="gray.500">
                      {formatFileSize(attachment.size)}
                    </Text>
                  )}
                </Box>
              ) : (
                <Flex align="center" gap={2}>
                  <Box flexShrink={0}>
                    {getFileIcon(attachment.mimeType || "")}
                  </Box>
                  <Box flex={1} minW={0}>
                    <Text fontSize="xs" fontWeight="medium" truncate>
                      {attachment.name}
                    </Text>
                    {attachment.size && (
                      <Text fontSize="xs" color="gray.500">
                        {formatFileSize(attachment.size)}
                      </Text>
                    )}
                  </Box>
                </Flex>
              )}
            </Box>
          ))}
        </Flex>
      </Box>
    );
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
                {/* Render attachments */}
                {message.attachments && renderAttachments(message.attachments)}
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
        <Uploady {...uploadConfig}>
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={onSendMessage}
            isDisabled={isDisabled}
          />
        </Uploady>
      </Box>
    </Box>
  );
};

export default Chat;
