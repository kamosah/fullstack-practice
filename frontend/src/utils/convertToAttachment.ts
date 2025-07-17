import type { Attachment } from '../types/chat';
import type { UploadedFile } from '../types/upload';

/**
 * Converts an UploadedFile to an Attachment for chat message payloads.
 */
export function convertToAttachment(uploadedFile: UploadedFile): Attachment {
  let type: 'text' | 'image' | 'file' | 'document' = 'file';
  if (uploadedFile.mimeType.startsWith('image/')) {
    type = 'image';
  } else if (uploadedFile.mimeType === 'application/pdf') {
    type = 'document';
  } else if (uploadedFile.mimeType === 'text/plain') {
    type = 'text';
  } else if (uploadedFile.mimeType.includes('wordprocessingml')) {
    type = 'document';
  }
  return {
    type,
    name: uploadedFile.fileName,
    url: uploadedFile.fileUrl,
    size: uploadedFile.fileSize,
    mimeType: uploadedFile.mimeType,
    metadata: uploadedFile.metadata,
  };
}
