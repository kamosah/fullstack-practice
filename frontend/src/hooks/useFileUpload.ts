import {
  useItemProgressListener,
  useItemFinishListener,
  useItemErrorListener,
  useItemStartListener,
  useBatchAddListener,
} from "@rpldy/uploady";
import { useState, useCallback } from "react";

import { validateFile, formatFileSize } from "./useUploadConfig";

import type {
  PendingFile,
  UploadedFile,
  UploadResponse,
} from "../types/upload";


export const useFileUpload = () => {
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
    console.log("Batch added, files will auto-upload:", batch);
    // Files will auto-upload due to autoUpload: true
  });

  // Listen to item start events (when files are selected and auto-upload begins)
  useItemStartListener((item) => {
    console.log("useFileUpload: Item started (auto-upload):", item);
    console.log("Item file:", item.file);
    console.log("Item url:", item.url);

    // Type guard to ensure we have a proper File object
    if (item.file && item.file instanceof File) {
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
        uploadStatus: "uploading", // Start as uploading since auto-upload is enabled
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
    console.log("useFileUpload: Item progress:", item);
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
    console.log("useFileUpload: Item finished:", {
      item,
      pendingFiles,
    });
    if (item.uploadStatus === 200) {
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
    console.log("useFileUpload: Item error:", item);
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
    // Reset error states - auto-upload will retry automatically
    setPendingFiles((prev) =>
      prev.map((file) => ({
        ...file,
        uploadStatus: "uploading" as const,
        uploadProgress: 0,
        error: undefined,
      }))
    );
    setUploadError(null);
    return Promise.resolve(uploadedFiles);
  }, [uploadedFiles]);

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
    const uploadingFiles = pendingFiles.filter(
      (f) => f.uploadStatus === "uploading"
    ).length;
    return {
      totalFiles,
      totalSize: formatFileSize(totalSize),
      completedFiles,
      errorFiles,
      uploadingFiles,
      isComplete: completedFiles === totalFiles && totalFiles > 0,
      hasErrors: errorFiles > 0,
      isUploading: uploadingFiles > 0,
    };
  }, [pendingFiles]);

  return {
    pendingFiles,
    uploadedFiles,
    isUploading: getFileStats().isUploading,
    uploadError,
    addFiles,
    removeFile,
    clearFiles,
    retryUpload,
    getFileStats,
  };
};
