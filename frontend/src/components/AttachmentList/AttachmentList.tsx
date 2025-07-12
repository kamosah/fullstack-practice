import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { type Attachment } from "../../types/chat";
import AttachmentItem from "./AttachmentItem";

interface AttachmentListProps {
  attachments: Attachment[];
}

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) return null;
  return (
    <Box mt={2}>
      <Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap>
        {attachments.map((attachment, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: "grey.50",
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "grey.200",
              p: 1.5,
              maxWidth: 100,
            }}
          >
            <AttachmentItem attachment={attachment} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default AttachmentList;
