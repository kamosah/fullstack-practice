import React from "react";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import { TbTableFilled } from 'react-icons/tb';
import { FaRegEdit } from 'react-icons/fa';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const SidebarHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 1, borderBottom: 1, borderColor: 'grey.100' }}>
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
          <ListItemButton
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 1,
              pl: 1,
              pr: 1,
              py: 0.5,
              color: 'CaptionText',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'CaptionText',
              }}
            >
              <FaRegEdit />
            </ListItemIcon>
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
    </Box>
  );
};

export default SidebarHeader;
