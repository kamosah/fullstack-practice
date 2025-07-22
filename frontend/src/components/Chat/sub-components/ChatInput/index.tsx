import React from 'react';

import { useFileUpload } from '../../../../hooks/useFileUpload';
import { convertToAttachment } from '../../../../utils/fileHelpers';
import { PendingFiles } from '../../../PendingFiles';
import ChatToolbar from '../ChatToolbar';

import { ChatInputRoot, ChatInputContainer, ChatInputForm, ChatInputTextarea } from './styles';

import type { Attachment } from '../../../../types/chat';

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
    <ChatInputRoot>
      <PendingFiles />
      <ChatInputContainer sx={{ boxShadow: 4 }}>
        <ChatInputForm as="form" onSubmit={handleSubmit}>
          <ChatInputTextarea
            disabled={isDisabled || hasUploadingFiles}
            maxRows={6}
            minRows={1}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask Anything..."
            value={inputValue}
          />
          <ChatToolbar
            canSendMessage={canSendMessage}
            handleSubmit={handleSubmit}
            isDisabled={isDisabled}
          />
        </ChatInputForm>
      </ChatInputContainer>
    </ChatInputRoot>
  );
};

export default ChatInput;
