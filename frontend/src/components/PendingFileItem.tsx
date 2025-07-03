import React from "react";
import { Box, Flex, Text, IconButton, Image } from "@chakra-ui/react";
import {
  AiOutlineFile,
  AiOutlineFilePdf,
  AiOutlineFileText,
  AiOutlineClose,
} from "react-icons/ai";
import type { PendingFile } from "../types/upload";
import { formatFileSize } from "../hooks/useUploadConfig";

interface PendingFileItemProps {
  file: PendingFile;
  onRemove: (fileId: string) => void;
}

const PendingFileItem: React.FC<PendingFileItemProps> = ({
  file,
  onRemove,
}) => {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return null; // Will show image preview
    } else if (mimeType === "application/pdf") {
      return <AiOutlineFilePdf size={20} color="#dc2626" />;
    } else if (mimeType === "text/plain") {
      return <AiOutlineFileText size={20} color="#059669" />;
    } else {
      return <AiOutlineFile size={20} color="#6b7280" />;
    }
  };

  const renderFilePreview = () => {
    if (file.preview && file.file.type.startsWith("image/")) {
      return (
        <Image
          src={file.preview}
          alt={file.file.name}
          boxSize="32px"
          objectFit="cover"
          borderRadius="4px"
        />
      );
    }
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxSize="32px"
        bg="gray.100"
        borderRadius="4px"
      >
        {getFileIcon(file.file.type)}
      </Box>
    );
  };

  const getStatusColor = () => {
    switch (file.uploadStatus) {
      case "uploading":
        return "blue.500";
      case "completed":
        return "green.500";
      case "error":
        return "red.500";
      default:
        return "gray.500";
    }
  };

  return (
    <Box
      bg="gray.50"
      borderRadius="8px"
      border="1px"
      borderColor="gray.200"
      p={2}
      display="flex"
      alignItems="center"
      gap={2}
      minW="200px"
      maxW="300px"
    >
      {renderFilePreview()}

      <Box flex={1} minW={0}>
        <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
          {file.file.name}
        </Text>
        <Flex alignItems="center" gap={2}>
          <Text fontSize="xs" color="gray.600">
            {formatFileSize(file.file.size)}
          </Text>
          {file.uploadStatus === "uploading" && (
            <Text fontSize="xs" color={getStatusColor()}>
              {file.uploadProgress}%
            </Text>
          )}
          {file.uploadStatus === "error" && (
            <Text fontSize="xs" color={getStatusColor()}>
              Error
            </Text>
          )}
          {file.uploadStatus === "completed" && (
            <Text fontSize="xs" color={getStatusColor()}>
              ✓
            </Text>
          )}
        </Flex>
        {file.uploadStatus === "uploading" && (
          <Box w="100%" h="2px" bg="gray.200" borderRadius="1px" mt={1}>
            <Box
              h="100%"
              bg={getStatusColor()}
              borderRadius="1px"
              width={`${file.uploadProgress}%`}
              transition="width 0.2s"
            />
          </Box>
        )}
      </Box>

      <IconButton
        aria-label="Remove file"
        size="sm"
        variant="ghost"
        onClick={() => onRemove(file.id)}
        _hover={{ bg: "gray.200" }}
      >
        <AiOutlineClose />
      </IconButton>
    </Box>
  );
};

export default PendingFileItem;
