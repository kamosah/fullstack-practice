import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LoadingContainer } from './styles';

export interface LoadingIndicatorProps {
  text?: string;
  size?: number | 'small' | 'medium' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text = 'Loading...', size = 40 }) => {
  return (
    <LoadingContainer>
      <Stack spacing={2} alignItems="center">
        <CircularProgress size={size} color="primary" thickness={4} />
        <Typography color="text.secondary" variant="body2" fontWeight={500}>
          {text}
        </Typography>
      </Stack>
    </LoadingContainer>
  );
};

export default LoadingIndicator;
