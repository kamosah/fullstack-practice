import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useConversation } from '../../../../hooks/useConversation';
import { useFileUpload } from '../../../../hooks/useFileUpload';
import { ResponsiveChatWidth } from '../../../../styles/layout';
import { isConversation } from '../../../../utils/chatHelpers';
import { convertToAttachment } from '../../../../utils/fileHelpers';
import { PendingFiles } from '../../../PendingFiles';
import ChatToolbar from '../ChatToolbar';

import { ChatInputRoot, ChatInputContainer, ChatInputForm, ChatInputTextarea } from './styles';

import type { Attachment } from '../../../../types/chat';

const ChatInput: React.FC = () => {
  const { uploadedFiles, clearFiles, pendingFiles } = useFileUpload();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { createConversation, addMessage, isLoading } = useConversation();
  const navigate = useNavigate();

  const hasUploadingFiles = pendingFiles.some((file) => file.uploadStatus === 'uploading');
  const hasFailedFiles = pendingFiles.some((file) => file.uploadStatus === 'error');
  const canSendMessage = Boolean(inputValue.trim()) && !isLoading && !hasUploadingFiles;
  const isNewChat = pathname === '/';
  const sendMessage = isNewChat ? createConversation : addMessage;

  const onSendMessage = async (message: string, attachments?: Attachment[]) => {
    setIsTyping(true);
    try {
      const result = await sendMessage(message, attachments);
      if (isConversation(result)) {
        navigate(`conversations/${result.id}`);
      } else {
        navigate(`/conversations/${result!.conversationId}`);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
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
    <ChatInputRoot
      isNewChat={isNewChat}
      sx={{
        width: isNewChat ? '100%' : ResponsiveChatWidth,
      }}
    >
      <PendingFiles />
      <ChatInputContainer sx={{ boxShadow: 4 }}>
        <ChatInputForm as="form" onSubmit={handleSubmit}>
          <ChatInputTextarea
            disabled={isLoading || isTyping || hasUploadingFiles}
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
            isDisabled={isLoading || isTyping || hasUploadingFiles}
          />
        </ChatInputForm>
      </ChatInputContainer>
    </ChatInputRoot>
  );
};

export default ChatInput;
