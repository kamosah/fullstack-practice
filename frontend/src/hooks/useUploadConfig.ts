import { formatFileSize } from '../utils/fileHelpers';

import type { UploadyProps } from '@rpldy/uploady';

export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_MESSAGE: 5,
  ALLOWED_TYPES: {
    'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    'application/pdf': ['.pdf'],
    'text/plain': ['.txt'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  PREVIEW_PANEL: {
    DEFAULT_WIDTH: 300,
    MIN_WIDTH: 200,
    MAX_WIDTH: 500,
  },
};

export const useUploadConfig = (): UploadyProps => {
  return {
    destination: {
      url: 'http://localhost:8000/api/upload',
      method: 'POST',
      filesParamName: 'files', // Explicitly set the parameter name
      headers: {
        // Don't set Content-Type, let the browser set it for multipart/form-data
      },
    },
    fileFilter: (file) => {
      // Check if file is a valid File object
      if (!(file instanceof File)) {
        return false; // Reject non-File objects
      }
      // Filter files based on size and type
      if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
        return false; // Reject files larger than max size
      }
      const allowedTypes = [
        'text/plain',
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        return false; // Reject unsupported file types
      }
      return true; // Accept the file
    },
    multiple: true,
    autoUpload: true,
    grouped: false, // Try sending files individually instead of grouped
    concurrent: false, // Process one file at a time
  };
};

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File too large. Maximum size: ${formatFileSize(UPLOAD_CONFIG.MAX_FILE_SIZE)}`,
    };
  }

  // Check file type
  const allowedTypes = [
    'text/plain',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Unsupported file type: ${file.type}`,
    };
  }

  return { isValid: true };
};
