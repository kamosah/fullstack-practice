// Utility functions for file-related helpers

import { AiOutlineFile, AiOutlineFilePdf, AiOutlineFileText } from 'react-icons/ai';

import type { Attachment } from '../types/chat';
import type { UploadedFile } from '../types/upload';

/**
 * Returns a file icon React element based on the provided MIME type.
 * @param mimeType - The MIME type of the file.
 * @returns A React element representing the file icon, or null for images.
 */
export const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return null;
  } else if (mimeType === 'application/pdf') {
    return <AiOutlineFilePdf size={20} color="#dc2626" />;
  } else if (mimeType === 'text/plain') {
    return <AiOutlineFileText size={20} color="#059669" />;
  } else {
    return <AiOutlineFile size={20} color="#6b7280" />;
  }
};

/**
 * Formats a file size in bytes to a human-readable string with appropriate units.
 *
 * @param bytes - The file size in bytes
 * @returns A formatted string representing the file size with appropriate unit (Bytes, KB, MB, or GB)
 *
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Converts an uploaded file to an attachment object.
 *
 * This function determines the attachment type based on the MIME type and creates
 * a standardized attachment object from the uploaded file data.
 *
 * @param {UploadedFile} uploadedFile - The file that was uploaded
 * @returns {Attachment} A formatted attachment object with the following properties:
 *   - type: Categorized as 'text', 'image', 'file', or 'document' based on MIME type
 *   - name: The original filename
 *   - url: The URL where the file is stored
 *   - size: The file size
 *   - mimeType: The MIME type of the file
 *   - metadata: Any additional metadata associated with the file
 */
export const convertToAttachment = (uploadedFile: UploadedFile): Attachment => {
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
};
