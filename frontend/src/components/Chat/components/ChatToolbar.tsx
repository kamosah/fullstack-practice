import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { PiArrowElbowRightUp } from 'react-icons/pi';
import UploadButton from '@rpldy/upload-button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineFolder, AiOutlineUpload } from 'react-icons/ai';
import Typography from '@mui/material/Typography';

type ChatToolbarProps = {
  canSendMessage: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isDisabled: boolean;
};

const ChatToolbar: React.FC<ChatToolbarProps> = ({ canSendMessage, handleSubmit, isDisabled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      mt={1}
      px={1}
      py={0.5}
      bgcolor="transparent"
      borderRadius="100%"
      width="100%"
      justifyContent="space-between"
      sx={{
        boxShadow: 0,
        fontSize: '1.25rem',
      }}
    >
      <Box className="left-actions">
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
              <IconButton>
                <AiOutlineFolder size={16} style={{ marginRight: 8 }} />
              </IconButton>
              <Typography variant="body2">Upload from Computer</Typography>
            </MenuItem>
          </UploadButton>
        </Menu>
        <IconButton
          ref={iconButtonRef}
          aria-label="Upload file"
          onClick={() => setIsMenuOpen((open) => !open)}
          size="small"
          sx={{
            color: 'grey.500',
            '&:hover': { color: 'grey.700' },
            border: '1px solid',
            borderColor: 'grey.200',
          }}
          disabled={isDisabled}
        >
          <AiOutlineUpload fontSize="1.5rem" />
        </IconButton>
      </Box>
      <Box className="right-actions">
        <IconButton
          aria-label="Send message"
          onClick={canSendMessage ? handleSubmit : undefined}
          size="small"
          sx={{
            color: canSendMessage ? 'grey.500' : 'grey.300',
            '&:hover': { color: canSendMessage ? 'grey.700' : 'grey.300' },
            border: '1px solid',
            borderColor: 'grey.200',
          }}
          disabled={!canSendMessage}
        >
          <PiArrowElbowRightUp fontSize="1.5rem" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatToolbar;
