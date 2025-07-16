import React from 'react';
import Box from '@mui/material/Box';
import { useFileUpload } from '../../../hooks/useFileUpload';
import type { UploadedFile } from '../../../types/upload';
import type { Attachment } from '../../../types/chat';
import PendingFiles from '../../PendingFiles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ChatToolbar from './ChatToolbar';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isDisabled = false,
}) => {
  const { uploadedFiles, clearFiles, pendingFiles } = useFileUpload();

  const hasUploadingFiles = pendingFiles.some((file) => file.uploadStatus === 'uploading');

  const hasFailedFiles = pendingFiles.some((file) => file.uploadStatus === 'error');

  const canSendMessage = Boolean(inputValue.trim()) && !isDisabled && !hasUploadingFiles;

  // Helper function to convert UploadedFile to Attachment
  const convertToAttachment = (uploadedFile: UploadedFile): Attachment => {
    // Determine attachment type based on MIME type
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSendMessage) {
      if (hasUploadingFiles) {
        console.log('Files are still uploading, please wait...');
      } else if (hasFailedFiles) {
        console.log('Some files failed to upload. Please try again.');
      }
      return;
    }
    const attachments = uploadedFiles.map(convertToAttachment);
    onSendMessage(inputValue.trim(), attachments.length > 0 ? attachments : undefined);
    setInputValue('');
    clearFiles();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && canSendMessage) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        py: 0,
        px: 0,
        bgcolor: 'transparent',
        flexShrink: 0,
        width: '100%',
      }}
      borderRadius="1.5rem"
      component="div"
    >
      <PendingFiles />
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        bgcolor="grey.50"
        border={1}
        borderColor="grey.200"
        borderRadius={8}
        px={1}
        py={1}
        width="100%"
        sx={{
          '&:hover': { borderColor: isDisabled ? 'grey.200' : 'grey.300' },
          '&:focus-within': {
            borderColor: isDisabled ? 'grey.200' : 'primary.main',
            boxShadow: isDisabled ? 'none' : '0 0 0 1px',
          },
        }}
      >
        <Box flex={1} minWidth={0} display="flex" alignItems="center" paddingTop="1.25rem">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              alignItems: 'stretch',
              bgcolor: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              width: '100%',
            }}
          >
            <TextareaAutosize
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              minRows={1}
              maxRows={6}
              placeholder="Ask Anything..."
              disabled={isDisabled || hasUploadingFiles}
              style={{
                width: '100%',
                fontSize: 16,
                background: 'transparent',
                color: isDisabled ? '#aaa' : 'inherit',
                border: 'none',
                resize: 'none',
                outline: 'none',
                padding: 0,
                paddingLeft: '1rem',
                paddingRIght: '1rem',
              }}
            />
            <ChatToolbar
              canSendMessage={canSendMessage}
              handleSubmit={handleSubmit}
              isDisabled={isDisabled}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInput;
