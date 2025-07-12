import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { TbTableFilled } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, borderBottom: 1, borderColor: "grey.100" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Stack
          direction="row"
          spacing={2}
          component="a"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
          alignItems="center"
        >
          <TbTableFilled size={28} color="#1976d2" />
          <Typography variant="h5" color="text.primary" fontWeight={700}>
            Hebbia
          </Typography>
        </Stack>
        <IconButton onClick={() => navigate("/")} size="small" color="primary">
          <FaRegEdit />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default SidebarHeader;
