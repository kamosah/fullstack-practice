export interface PendingFile {
  id: string;
  file: File;
  preview?: string;
  uploadProgress: number;
  uploadStatus: "pending" | "uploading" | "completed" | "error";
  error?: string;
  uploadId?: string;
}

export interface UploadedFile {
  uploadId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

export interface UploadResponse {
  files: UploadedFile[];
}

export interface FileUploadProgress {
  [fileId: string]: {
    progress: number;
    status: "uploading" | "completed" | "error";
    error?: string;
  };
}

export interface AttachmentWithPreview {
  id: string;
  type: string;
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, unknown>;
  preview?: string;
  isPreviewOpen?: boolean;
}

export type FileCategory = "image" | "document" | "text" | "file";

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}
