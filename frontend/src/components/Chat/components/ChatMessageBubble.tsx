import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MessageType } from '../../../types/chat';
import type { Message } from '../../../types/chat';
import MarkdownRenderer from '../../MarkdownRenderer';
import AttachmentList from '../../AttachmentList/AttachmentList';

const ChatMessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <Stack
    alignItems="flex-start"
    className="message-enter"
    direction="row"
    justifyContent={message.type === MessageType.USER ? 'flex-end' : 'flex-start'}
    spacing={2}
  >
    <Box
      sx={{
        maxWidth: '70%',
        bgcolor: message.type === MessageType.USER ? 'grey.50' : 'transparent',
        color: message.type === MessageType.USER ? 'grey.900' : 'text.primary',
        px: 2,
        py: 1.5,
        borderRadius: 6,
        boxShadow: message.type === MessageType.USER ? 1 : 0,
        justifyContent: 'flex-end',
      }}
    >
      {message.type === MessageType.AGENT ? (
        <MarkdownRenderer markdown={message.content} />
      ) : (
        <Typography variant="body2" sx={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {message.content}
        </Typography>
      )}
      {message.attachments && <AttachmentList attachments={message.attachments} />}
    </Box>
  </Stack>
);

export default ChatMessageBubble;
