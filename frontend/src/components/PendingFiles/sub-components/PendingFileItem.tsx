import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { formatFileSize, getFileIcon } from '../../../utils/fileHelpers';

import {
  PendingFileDetails,
  StatusContainer,
  ProgressContainer,
  ProgressBar,
  PendingFileItemRoot,
  PreviewContainer,
} from './styles';

import type { PendingFile } from '../../../types/upload';

interface PendingFileItemProps {
  file: PendingFile;
  onRemove: (fileId: string) => void;
}

const PendingFileItem: React.FC<PendingFileItemProps> = ({ file, onRemove }) => {
  const renderFilePreview = () => {
    if (file.preview && file.file.type.startsWith('image/')) {
      return (
        <Avatar
          src={file.preview}
          alt={file.file.name}
          sx={{ width: 32, height: 32, borderRadius: 1 }}
          slotProps={{ img: { style: { objectFit: 'cover' } } }}
        />
      );
    }
    return <PreviewContainer>{getFileIcon(file.file.type)}</PreviewContainer>;
  };

  const getStatusColor = () => {
    switch (file.uploadStatus) {
      case 'uploading':
        return 'primary.main';
      case 'completed':
        return 'success.main';
      case 'error':
        return 'error.main';
      default:
        return 'grey.500';
    }
  };

  return (
    <PendingFileItemRoot>
      {renderFilePreview()}
      <PendingFileDetails spacing={0.5}>
        <Typography variant="body2" fontWeight={500} noWrap>
          {file.file.name}
        </Typography>
        <StatusContainer spacing={2}>
          <Typography variant="caption" color="text.secondary">
            {formatFileSize(file.file.size)}
          </Typography>
          {file.uploadStatus === 'uploading' && (
            <Typography variant="caption" color={getStatusColor()}>
              {file.uploadProgress}%
            </Typography>
          )}
          {file.uploadStatus === 'error' && (
            <Typography variant="caption" color={getStatusColor()}>
              Error
            </Typography>
          )}
          {file.uploadStatus === 'completed' && (
            <Typography variant="caption" color={getStatusColor()}>
              ✓
            </Typography>
          )}
        </StatusContainer>
        {file.uploadStatus === 'uploading' && (
          <ProgressContainer>
            <ProgressBar sx={{ bgcolor: getStatusColor(), width: `${file.uploadProgress}%` }} />
          </ProgressContainer>
        )}
      </PendingFileDetails>
      <IconButton
        aria-label="Remove file"
        size="small"
        onClick={() => onRemove(file.id)}
        sx={{ color: 'grey.700', '&:hover': { bgcolor: 'grey.200' } }}
      >
        <AiOutlineClose />
      </IconButton>
    </PendingFileItemRoot>
  );
};

export default PendingFileItem;
