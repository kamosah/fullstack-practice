import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { TbTableFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { SidebarHeaderRoot, SidebarListItemIcon } from './styles';

const SidebarHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SidebarHeaderRoot>
      <IconButton
        onClick={() => navigate('/')}
        color="primary"
        aria-label="Home"
        sx={{
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          mb: 0.5,
        }}
      >
        <TbTableFilled size={24} />
      </IconButton>
      <List sx={{ p: 0 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <SidebarListItemIcon>
              <FaRegEdit />
            </SidebarListItemIcon>
            <ListItemText
              primary="Chat"
              slotProps={{
                primary: {
                  variant: 'body2',
                  fontWeight: 500,
                  color: 'CaptionText',
                  noWrap: true,
                  lineHeight: '1.43',
                  ml: 1,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </SidebarHeaderRoot>
  );
};

export default SidebarHeader;
