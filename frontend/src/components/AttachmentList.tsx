import React, { useState } from "react";
import { Box, Flex, Text, Image, Spinner } from "@chakra-ui/react";
import {
  AiOutlineFile,
  AiOutlineFilePdf,
  AiOutlineFileText,
} from "react-icons/ai";
import { type Attachment } from "../types/chat";
import { formatFileSize } from "../hooks/useUploadConfig";

const getFileIcon = (mimeType: string) => {
  if (mimeType === "application/pdf") {
    return <AiOutlineFilePdf size={16} color="#dc2626" />;
  } else if (mimeType === "text/plain") {
    return <AiOutlineFileText size={16} color="#059669" />;
  } else {
    return <AiOutlineFile size={16} color="#6b7280" />;
  }
};

interface AttachmentItemProps {
  attachment: Attachment;
}

export const AttachmentItem: React.FC<AttachmentItemProps> = ({
  attachment,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (attachment.type === "image") {
    return (
      <Box>
        {!loaded && !error && <Spinner size="sm" />}
        <Image
          src={attachment.url || ""}
          alt={attachment.name || "Image attachment"}
          maxH="100px"
          objectFit="cover"
          borderRadius="4px"
          mb={1}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          display={loaded ? "block" : "none"}
        />
        {error && (
          <Text fontSize="xs" color="red.500">
            Failed to load image: {attachment.url}
          </Text>
        )}
      </Box>
    );
  }

  return (
    <Flex align="center" gap={2}>
      <Box flexShrink={0}>{getFileIcon(attachment.mimeType || "")}</Box>
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
  );
};

interface AttachmentListProps {
  attachments: Attachment[];
}

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments }) => {
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
            maxW="100px"
          >
            <AttachmentItem attachment={attachment} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AttachmentList;
