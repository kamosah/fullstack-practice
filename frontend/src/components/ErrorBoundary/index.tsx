import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { LuRefreshCw, LuInfo } from 'react-icons/lu';

import { ErrorContainer, ErrorIconBox } from './styles';

interface ErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error = 'Something went wrong',
  onRetry,
}) => {
  return (
    <ErrorContainer>
      <Stack spacing={3} alignItems="center">
        <ErrorIconBox>
          <LuInfo size={24} color="#E53E3E" />
        </ErrorIconBox>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h6" color="error.dark">
            Oops! Something went wrong
          </Typography>
          <Typography color="error.main" variant="body2">
            {error}
          </Typography>
        </Stack>
        {onRetry && (
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={onRetry}
            startIcon={<LuRefreshCw />}
          >
            Try Again
          </Button>
        )}
      </Stack>
    </ErrorContainer>
  );
};

export default ErrorBoundary;
