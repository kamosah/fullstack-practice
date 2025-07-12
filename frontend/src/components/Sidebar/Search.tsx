import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LuSearch } from "react-icons/lu";

const SidebarSearch: React.FC = () => (
  <Box sx={{ position: "relative", mt: 2 }}>
    <TextField
      placeholder="Search conversations"
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
              <LuSearch size={18} color="#90a4ae" />
            </Box>
          ),
        },
      }}
      sx={{
        bgcolor: "grey.50",
        borderRadius: 2,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "grey.200" },
          "&:hover fieldset": { borderColor: "grey.300" },
          "&.Mui-focused fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Box>
);

export default SidebarSearch;
