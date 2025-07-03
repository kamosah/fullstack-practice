import { useState, useCallback } from "react";
import {
  useUploadyContext,
  useItemProgressListener,
  useItemFinishListener,
  useItemErrorListener,
  useItemStartListener,
  useBatchAddListener,
} from "@rpldy/uploady";
import type {
  PendingFile,
  UploadedFile,
  UploadResponse,
} from "../types/upload";
import { validateFile, formatFileSize } from "./useUploadConfig";

export const useFileUpload = () => {
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const uploady = useUploadyContext();

  const addFiles = useCallback((files: File[]) => {
    const newPendingFiles: PendingFile[] = [];

    files.forEach((file) => {
      const validation = validateFile(file);

      if (!validation.isValid) {
        // Handle validation error - could show toast or inline error
        console.error(
          `File validation failed for ${file.name}: ${validation.error}`
        );
        return;
      }

      const pendingFile: PendingFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        uploadProgress: 0,
        uploadStatus: "pending",
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      };

      newPendingFiles.push(pendingFile);
    });

    setPendingFiles((prev) => [...prev, ...newPendingFiles]);
  }, []);

  useBatchAddListener((batch) => {
    addFiles(batch.items.map((item) => item.file as File));
  });

  // Listen to item start events (when files are selected)
  useItemStartListener((item) => {
    if (item.file) {
      const validation = validateFile(item.file);

      if (!validation.isValid) {
        console.error(
          `File validation failed for ${item.file.name}: ${validation.error}`
        );
        return false; // Cancel the upload
      }

      const pendingFile: PendingFile = {
        id: item.id,
        file: item.file,
        uploadProgress: 0,
        uploadStatus: "pending",
        preview: item.file.type.startsWith("image/")
          ? URL.createObjectURL(item.file)
          : undefined,
      };

      setPendingFiles((prev) => {
        // Check if file already exists
        const exists = prev.some((f) => f.id === item.id);
        return exists ? prev : [...prev, pendingFile];
      });
    }
  });

  const removeFile = useCallback((fileId: string) => {
    setPendingFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  }, []);

  // Listen to upload progress events
  useItemProgressListener((item) => {
    setPendingFiles((prev) =>
      prev.map((file) =>
        file.id === item.id
          ? {
              ...file,
              uploadProgress: item.completed,
              uploadStatus: "uploading" as const,
            }
          : file
      )
    );
  });

  // Listen to upload finish events
  useItemFinishListener((item) => {
    if (item.uploadResponse?.status === 200) {
      const responseData = item.uploadResponse.data as UploadResponse;

      // Update pending file to completed
      setPendingFiles((prev) =>
        prev.map((file) =>
          file.id === item.id
            ? {
                ...file,
                uploadStatus: "completed" as const,
                uploadProgress: 100,
              }
            : file
        )
      );

      // Add to uploaded files
      setUploadedFiles((prev) => [...prev, ...responseData.files]);
    }
  });

  // Listen to upload error events
  useItemErrorListener((item) => {
    const errorMessage = item.uploadResponse?.data?.message || "Upload failed";

    setPendingFiles((prev) =>
      prev.map((file) =>
        file.id === item.id
          ? { ...file, uploadStatus: "error" as const, error: errorMessage }
          : file
      )
    );

    setUploadError(errorMessage);
  });

  const uploadFiles = useCallback(async (): Promise<UploadedFile[]> => {
    if (pendingFiles.length === 0) {
      return [];
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Update status to uploading
      setPendingFiles((prev) =>
        prev.map((file) => ({ ...file, uploadStatus: "uploading" as const }))
      );

      const filesToUpload = pendingFiles.map((pf) => pf.file);

      // Use uploady to upload files
      uploady.upload(filesToUpload);

      // Return a promise that resolves when upload is complete
      return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
          const allCompleted = pendingFiles.every(
            (file) =>
              file.uploadStatus === "completed" || file.uploadStatus === "error"
          );

          if (allCompleted) {
            clearInterval(checkInterval);
            setIsUploading(false);

            const hasErrors = pendingFiles.some(
              (file) => file.uploadStatus === "error"
            );
            if (hasErrors) {
              reject(new Error("Some files failed to upload"));
            } else {
              resolve(uploadedFiles);
            }
          }
        }, 100);

        // Timeout after 30 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          setIsUploading(false);
          reject(new Error("Upload timeout"));
        }, 30000);
      });
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";

      setUploadError(errorMessage);

      // Update pending files to error state
      setPendingFiles((prev) =>
        prev.map((file) => ({
          ...file,
          uploadStatus: "error" as const,
          error: errorMessage,
        }))
      );

      setIsUploading(false);
      throw error;
    }
  }, [pendingFiles, uploady, uploadedFiles]);

  const clearFiles = useCallback(() => {
    // Clean up preview URLs
    pendingFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setPendingFiles([]);
    setUploadedFiles([]);
    setUploadError(null);
  }, [pendingFiles]);

  const retryUpload = useCallback(() => {
    // Reset error states and retry
    setPendingFiles((prev) =>
      prev.map((file) => ({
        ...file,
        uploadStatus: "pending" as const,
        uploadProgress: 0,
        error: undefined,
      }))
    );
    setUploadError(null);
    return uploadFiles();
  }, [uploadFiles]);

  const getFileStats = useCallback(() => {
    const totalFiles = pendingFiles.length;
    const totalSize = pendingFiles.reduce(
      (sum, file) => sum + file.file.size,
      0
    );
    const completedFiles = pendingFiles.filter(
      (f) => f.uploadStatus === "completed"
    ).length;
    const errorFiles = pendingFiles.filter(
      (f) => f.uploadStatus === "error"
    ).length;

    return {
      totalFiles,
      totalSize: formatFileSize(totalSize),
      completedFiles,
      errorFiles,
      isComplete: completedFiles === totalFiles && totalFiles > 0,
      hasErrors: errorFiles > 0,
    };
  }, [pendingFiles]);

  return {
    pendingFiles,
    uploadedFiles,
    isUploading,
    uploadError,
    addFiles,
    removeFile,
    uploadFiles,
    clearFiles,
    retryUpload,
    getFileStats,
  };
};
