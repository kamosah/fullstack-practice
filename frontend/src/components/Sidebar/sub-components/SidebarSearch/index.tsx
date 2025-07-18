import Box from '@mui/material/Box';
import React from 'react';
import { LuSearch } from 'react-icons/lu';

import { SidebarTextField, SidebarSearchRoot } from './styles';

const SidebarSearch: React.FC = () => (
  <SidebarSearchRoot>
    <SidebarTextField
      placeholder="Search conversations"
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
              <LuSearch size={18} color="#90a4ae" />
            </Box>
          ),
        },
      }}
    />
  </SidebarSearchRoot>
);

export default SidebarSearch;
