import React from 'react';

import { FileAttachment, ImageAttachment } from './styles';

import type { Attachment } from '../../../types/chat';

interface AttachmentItemProps {
  attachment: Attachment;
}

const AttachmentItem: React.FC<AttachmentItemProps> = ({ attachment }) => {
  if (attachment.type === 'image') {
    return <ImageAttachment attachment={attachment} />;
  }
  return <FileAttachment attachment={attachment} />;
};

export default AttachmentItem;
