import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';

import { type Attachment } from '../../types/chat';

import AttachmentItem from './sub-components/AttachmentItem';

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
            bgcolor="grey.50"
            border="1px solid"
            borderColor="grey.200"
            borderRadius={1.5}
            maxWidth={100}
            p={1.5}
          >
            <AttachmentItem attachment={attachment} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default AttachmentList;
