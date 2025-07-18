// Utility functions for file-related helpers

import { AiOutlineFile, AiOutlineFilePdf, AiOutlineFileText } from 'react-icons/ai';

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
