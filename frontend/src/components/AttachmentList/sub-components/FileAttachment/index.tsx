import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatFileSize, getFileIcon } from '../../../../utils/fileHelpers';

import type { Attachment } from '../../../../types/chat';

export const FileAttachment: React.FC<{ attachment: Attachment }> = ({ attachment }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box flexShrink={0}>{getFileIcon(attachment.mimeType || '')}</Box>
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
