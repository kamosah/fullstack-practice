import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';
import { LuBot } from 'react-icons/lu';

const ChatTypingIndicator: React.FC = () => (
  <Stack direction="row" alignItems="flex-start" spacing={2}>
    <Avatar
      sx={{
        bgcolor: 'primary.main',
        width: 40,
        height: 40,
        fontSize: 18,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      <LuBot />
    </Avatar>
    <Box
      bgcolor="grey.100"
      px={2}
      py={1.5}
      borderRadius={2}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          width={8}
          height={8}
          bgcolor="grey.400"
          borderRadius="50%"
          mx={0.25}
          className={i === 1 ? 'typing-dot-delay-1' : i === 2 ? 'typing-dot-delay-2' : 'typing-dot'}
        />
      ))}
    </Box>
  </Stack>
);

export default ChatTypingIndicator;
