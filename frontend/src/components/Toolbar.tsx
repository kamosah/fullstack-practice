import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { LuPlus, LuColumns2 } from "react-icons/lu";
import { TbTableFilled } from "react-icons/tb";

const Toolbar = () => {
  return (
    <Box
      sx={{
        p: 2.5,
        borderBottom: "1px solid",
        borderColor: "grey.200",
        bgcolor: "grey.50",
        flexShrink: 0,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <IconButton size="large" sx={{ color: "primary.main" }}>
          <TbTableFilled size={28} />
        </IconButton>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            startIcon={<LuPlus />}
            onClick={() => {
              /* Handle add document */
            }}
          >
            Add documents
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<LuColumns2 />}
            onClick={() => {
              /* Handle add columns */
            }}
          >
            Add columns
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Toolbar;
