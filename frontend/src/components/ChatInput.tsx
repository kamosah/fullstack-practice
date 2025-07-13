import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AiOutlineUpload, AiOutlineFolder } from 'react-icons/ai';
import { PiArrowElbowRightUp } from 'react-icons/pi';
import UploadButton from '@rpldy/upload-button';
import { useFileUpload } from '../hooks/useFileUpload';
import type { UploadedFile } from '../types/upload';
import type { Attachment } from '../types/chat';
import PendingFiles from './PendingFiles';

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const hasUploadingFiles = pendingFiles.some((file) => file.uploadStatus === 'uploading');

  const hasFailedFiles = pendingFiles.some((file) => file.uploadStatus === 'error');

  const canSendMessage = inputValue.trim() && !isDisabled && !hasUploadingFiles;

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
        py: 2,
        px: 0,
        bgcolor: 'background.paper',
        flexShrink: 0,
      }}
    >
      <PendingFiles />

      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          bgcolor="grey.50"
          border={1}
          borderColor="grey.200"
          borderRadius={2}
          px={2}
          py={1.5}
          sx={{
            '&:hover': { borderColor: isDisabled ? 'grey.200' : 'grey.300' },
            '&:focus-within': {
              borderColor: isDisabled ? 'grey.200' : 'primary.main',
              boxShadow: isDisabled ? 'none' : '0 0 0 1px',
            },
          }}
        >
          <Menu
            anchorEl={isMenuOpen ? iconButtonRef.current : null}
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            slotProps={{
              list: { sx: { minWidth: 220, py: 1 } },
            }}
          >
            <UploadButton
              autoUpload
              extraProps={{
                style: {
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                },
              }}
            >
              <MenuItem onClick={() => setIsMenuOpen(false)}>
                <AiOutlineFolder size={16} style={{ marginRight: 8 }} />
                <Typography variant="body2">Upload from Computer</Typography>
              </MenuItem>
            </UploadButton>
          </Menu>
          <IconButton
            ref={iconButtonRef}
            aria-label="Upload file"
            onClick={() => setIsMenuOpen((open) => !open)}
            size="small"
            sx={{ color: 'grey.500', '&:hover': { color: 'grey.700' } }}
            disabled={isDisabled}
          >
            <AiOutlineUpload />
          </IconButton>
          <Box flex={1} minWidth={0}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Anything..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                minHeight: 32,
                fontSize: 16,
                color: isDisabled ? '#aaa' : 'inherit',
              }}
              disabled={isDisabled || hasUploadingFiles}
            />
          </Box>
          <IconButton
            aria-label="Send message"
            onClick={canSendMessage ? handleSubmit : undefined}
            size="small"
            sx={{
              color: canSendMessage ? 'grey.500' : 'grey.300',
              '&:hover': { color: canSendMessage ? 'grey.700' : 'grey.300' },
            }}
            disabled={!canSendMessage}
          >
            <PiArrowElbowRightUp />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default ChatInput;
