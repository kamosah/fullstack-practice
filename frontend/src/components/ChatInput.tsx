import React, { useState } from "react";
import { Flex, Input, Box, Menu, Portal, Icon, Text } from "@chakra-ui/react";
import { AiOutlineUpload, AiOutlineFolder } from "react-icons/ai";
import { PiArrowElbowRightUp } from "react-icons/pi";
import UploadButton from "@rpldy/upload-button";
import { useFileUpload } from "../hooks/useFileUpload";
import type { UploadedFile } from "../types/upload";
import type { Attachment } from "../types/chat";
import PendingFileItem from "./PendingFileItem";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isDisabled = false,
}) => {
  const { uploadedFiles, clearFiles, pendingFiles, removeFile } =
    useFileUpload();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasUploadingFiles = pendingFiles.some(
    (file) => file.uploadStatus === "uploading"
  );

  const hasFailedFiles = pendingFiles.some(
    (file) => file.uploadStatus === "error"
  );

  const canSendMessage = inputValue.trim() && !isDisabled && !hasUploadingFiles;

  // Handle menu open/close
  const handleMenuOpenChange = (details: { open: boolean }) => {
    setIsMenuOpen(details.open);
  };

  // Helper function to convert UploadedFile to Attachment
  const convertToAttachment = (uploadedFile: UploadedFile): Attachment => {
    // Determine attachment type based on MIME type
    let type: "text" | "image" | "file" | "document" = "file";
    if (uploadedFile.mimeType.startsWith("image/")) {
      type = "image";
    } else if (uploadedFile.mimeType === "application/pdf") {
      type = "document";
    } else if (uploadedFile.mimeType === "text/plain") {
      type = "text";
    } else if (uploadedFile.mimeType.includes("wordprocessingml")) {
      type = "document";
    }

    return {
      type,
      name: uploadedFile.fileName,
      url: uploadedFile.fileUrl,
      size: uploadedFile.fileSize,
      mimeType: uploadedFile.mimeType,
      metadata: uploadedFile.metadata,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSendMessage) {
      if (hasUploadingFiles) {
        console.log("Files are still uploading, please wait...");
      } else if (hasFailedFiles) {
        console.log("Some files failed to upload. Please try again.");
      }
      return;
    }

    // Convert uploaded files to attachment format
    const attachments = uploadedFiles.map(convertToAttachment);

    // Send message with attachments
    onSendMessage(
      inputValue.trim(),
      attachments.length > 0 ? attachments : undefined
    );

    // Clear input and uploaded files
    setInputValue("");
    clearFiles();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && canSendMessage) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box>
      {/* Display pending files */}
      {pendingFiles.length > 0 && (
        <Box mb={3}>
          <Flex wrap="wrap" gap={2}>
            {pendingFiles.map((file) => (
              <PendingFileItem
                key={file.id}
                file={file}
                onRemove={removeFile}
              />
            ))}
          </Flex>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Flex
          gap={2}
          align="center"
          bg="gray.50"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          px={3}
          py={2}
          _hover={{ borderColor: isDisabled ? "gray.200" : "gray.300" }}
          _focusWithin={{
            borderColor: isDisabled ? "gray.200" : "blue.500",
            boxShadow: isDisabled
              ? "none"
              : "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
        >
          <Menu.Root
            positioning={{ placement: "top-start" }}
            open={isMenuOpen}
            onOpenChange={handleMenuOpenChange}
          >
            <Menu.Trigger asChild>
              <Icon
                aria-label="Upload file"
                size="sm"
                cursor="pointer"
                as={AiOutlineUpload}
                color="gray.500"
                _hover={{ color: "gray.700" }}
              />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg="white"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  shadow="lg"
                  py={2}
                  minW="220px"
                >
                  <UploadButton
                    autoUpload={false}
                    extraProps={{
                      style: {
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: 0,
                      },
                    }}
                  >
                    <Menu.Item
                      value="upload-computer"
                      px={4}
                      py={3}
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                      gap={3}
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      <AiOutlineFolder size={16} color="currentColor" />
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          lineHeight="short"
                        >
                          Upload from Computer
                        </Text>
                      </Box>
                    </Menu.Item>
                  </UploadButton>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask Anything..."
            border="none"
            bg="transparent"
            outline="none"
            flex={1}
            minH="32px"
            _focus={{
              boxShadow: "none",
            }}
            disabled={isDisabled || hasUploadingFiles}
          />

          <Icon
            as={PiArrowElbowRightUp}
            aria-label="Send message"
            size="sm"
            cursor={canSendMessage ? "pointer" : "not-allowed"}
            color={canSendMessage ? "gray.500" : "gray.300"}
            _hover={{ color: canSendMessage ? "gray.700" : "gray.300" }}
            onClick={canSendMessage ? handleSubmit : undefined}
          />
        </Flex>
      </form>
    </Box>
  );
};

export default ChatInput;
