import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MuiIconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { UploadButton } from '@rpldy/upload-button';
import React, { useRef, useState } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';

import { PrimaryIconButton } from '../../../../shared-components/IconButton';

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
        <Tooltip title="Upload file" placement="top">
          <MuiIconButton
            ref={iconButtonRef}
            aria-label="Upload file"
            onClick={() => setIsMenuOpen((open) => !open)}
            disabled={isDisabled}
          >
            <AttachFileIcon />
          </MuiIconButton>
        </Tooltip>
        <PrimaryIconButton
          aria-label={`${canSendMessage ? 'Send message' : 'Disabled'}`}
          onClick={canSendMessage ? handleSubmit : undefined}
          disabled={!canSendMessage}
          tooltip="Send message"
        >
          <ArrowUpwardIcon
            color="inherit"
            sx={{ color: canSendMessage ? 'primary.contrastText' : 'inherit' }}
          />
        </PrimaryIconButton>
      </ToolbarActions>
    </ToolbarRoot>
  );
};

export default ChatToolbar;
