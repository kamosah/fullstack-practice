import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { UploadButton } from '@rpldy/upload-button';
import React, { useRef, useState } from 'react';
import { AiOutlineFolder, AiOutlineUpload } from 'react-icons/ai';
import { PiArrowElbowRightUp } from 'react-icons/pi';

import { ToolbarRoot, ToolbarActions } from './styles';

type ChatToolbarProps = {
  canSendMessage: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isDisabled: boolean;
};

const ChatToolbar: React.FC<ChatToolbarProps> = ({ canSendMessage, handleSubmit, isDisabled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <ToolbarRoot>
      <ToolbarActions>
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
              <AiOutlineFolder size={16} style={{ marginRight: 8 }} />
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
      </ToolbarActions>
      <ToolbarActions>
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
      </ToolbarActions>
    </ToolbarRoot>
  );
};

export default ChatToolbar;
