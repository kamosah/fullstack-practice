import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import type { Attachment } from '../../../../types/chat';

export const ImageAttachment: React.FC<{ attachment: Attachment }> = ({ attachment }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      {!loaded && !error && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={60}>
          <CircularProgress size={20} thickness={5} />
        </Box>
      )}
      <Avatar
        variant="rounded"
        src={attachment.url || ''}
        alt={attachment.name || 'Image attachment'}
        sx={{
          width: 60,
          height: 60,
          objectFit: 'cover',
          borderRadius: 1,
          mb: 1,
          display: loaded ? 'block' : 'none',
        }}
        slotProps={{
          img: {
            onLoad: () => setLoaded(true),
            onError: () => setError(true),
          },
        }}
      />
      {error && (
        <Typography variant="caption" color="error" display="block">
          Failed to load image: {attachment.url}
        </Typography>
      )}
    </>
  );
};
