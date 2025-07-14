import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import {
  AiOutlineFile,
  AiOutlineFilePdf,
  AiOutlineFileText,
} from "react-icons/ai";
import { type Attachment } from "../../types/chat";
import { formatFileSize } from "../../hooks/useUploadConfig";

const getFileIcon = (mimeType: string) => {
  if (mimeType === "application/pdf") {
    return <AiOutlineFilePdf size={20} color="#dc2626" />;
  } else if (mimeType === "text/plain") {
    return <AiOutlineFileText size={20} color="#059669" />;
  } else {
    return <AiOutlineFile size={20} color="#6b7280" />;
  }
};

interface AttachmentItemProps {
  attachment: Attachment;
}

const AttachmentItem: React.FC<AttachmentItemProps> = ({ attachment }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (attachment.type === "image") {
    return (
      <Box>
        {!loaded && !error && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={60}
          >
            <CircularProgress size={20} thickness={5} />
          </Box>
        )}
        <Avatar
          variant="rounded"
          src={attachment.url || ""}
          alt={attachment.name || "Image attachment"}
          sx={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: 1,
            mb: 1,
            display: loaded ? "block" : "none",
          }}
          slotProps={{
            img: {
              onLoad: () => setLoaded(true),
              onError: () => setError(true),
            },
          }}
        />
        {error && (
          <Typography variant="caption" color="error" display="block">
            Failed to load image: {attachment.url}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box flexShrink={0}>{getFileIcon(attachment.mimeType || "")}</Box>
      <Box flex={1} minWidth={0}>
        <Typography variant="caption" fontWeight={500} noWrap>
          {attachment.name}
        </Typography>
        {attachment.size && (
          <Typography variant="caption" color="text.secondary">
            {formatFileSize(attachment.size)}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default AttachmentItem;
