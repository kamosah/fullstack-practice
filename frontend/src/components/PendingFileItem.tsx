import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { AiOutlineFile, AiOutlineFilePdf, AiOutlineFileText, AiOutlineClose } from 'react-icons/ai';
import type { PendingFile } from '../types/upload';
import { formatFileSize } from '../hooks/useUploadConfig';

interface PendingFileItemProps {
  file: PendingFile;
  onRemove: (fileId: string) => void;
}

const PendingFileItem: React.FC<PendingFileItemProps> = ({ file, onRemove }) => {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return null; // Will show image preview
    } else if (mimeType === 'application/pdf') {
      return <AiOutlineFilePdf size={20} color="#dc2626" />;
    } else if (mimeType === 'text/plain') {
      return <AiOutlineFileText size={20} color="#059669" />;
    } else {
      return <AiOutlineFile size={20} color="#6b7280" />;
    }
  };

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
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={32}
        height={32}
        bgcolor="grey.100"
        borderRadius={1}
      >
        {getFileIcon(file.file.type)}
      </Box>
    );
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
    <Box
      sx={{
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        minWidth: 200,
        maxWidth: 300,
      }}
    >
      {renderFilePreview()}

      <Box flex={1} minWidth={0}>
        <Typography variant="body2" fontWeight={500} noWrap>
          {file.file.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
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
        </Stack>
        {file.uploadStatus === 'uploading' && (
          <Box
            sx={{
              width: '100%',
              height: 2,
              bgcolor: 'grey.200',
              borderRadius: 1,
              mt: 1,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                bgcolor: getStatusColor(),
                borderRadius: 1,
                width: `${file.uploadProgress}%`,
                transition: 'width 0.2s',
              }}
            />
          </Box>
        )}
      </Box>

      <IconButton
        aria-label="Remove file"
        size="small"
        onClick={() => onRemove(file.id)}
        sx={{
          color: 'grey.700',
          '&:hover': { bgcolor: 'grey.200' },
        }}
      >
        <AiOutlineClose />
      </IconButton>
    </Box>
  );
};

export default PendingFileItem;
