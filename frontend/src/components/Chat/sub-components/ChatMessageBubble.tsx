import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { MessageType } from '../../../types/chat';
import AttachmentList from '../../AttachmentList/AttachmentList';
import MarkdownRenderer from '../../MarkdownRenderer';

import { MessageBubbleBox } from './styles';

import type { Message } from '../../../types/chat';

const ChatMessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <Stack
    alignItems="flex-start"
    className="message-enter"
    direction="row"
    justifyContent={message.type === MessageType.USER ? 'flex-end' : 'flex-start'}
    spacing={2}
  >
    <MessageBubbleBox isUser={message.type === MessageType.USER}>
      {message.type === MessageType.AGENT ? (
        <MarkdownRenderer markdown={message.content} />
      ) : (
        <Typography variant="body2" sx={{ lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {message.content}
        </Typography>
      )}
      {message.attachments && <AttachmentList attachments={message.attachments} />}
    </MessageBubbleBox>
  </Stack>
);

export default ChatMessageBubble;
