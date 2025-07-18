import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const PendingFileDetails = styled(Stack)({
  flex: 1,
  minWidth: 0,
});

export const StatusContainer = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
});

export const ProgressContainer = styled(Stack)({
  width: '100%',
  height: 2,
  backgroundColor: '#e0e0e0',
  borderRadius: 4,
  marginTop: 8,
  overflow: 'hidden',
});

export const ProgressBar = styled(Stack)({
  height: '100%',
  borderRadius: 4,
  transition: 'width 0.2s',
});

export const PendingFileItemRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `1px solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  minWidth: 200,
  maxWidth: 300,
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
}));
