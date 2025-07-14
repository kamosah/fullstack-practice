import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SvgIcon from "@mui/material/SvgIcon";
import { onlineManager } from "@tanstack/react-query";
import { LuWifi } from "react-icons/lu";

interface MatrixStatusProps {
  isActive?: boolean;
  documentsCount?: number;
}

const MatrixStatus: React.FC<MatrixStatusProps> = ({ documentsCount = 0 }) => {
  const isOnline = onlineManager.isOnline();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        bgcolor: "grey.50",
        borderRadius: 2,
      }}
    >
      <SvgIcon
        component={LuWifi}
        sx={{ fontSize: 20, color: isOnline ? "success.main" : "grey.400" }}
      />
      <Typography variant="caption" color="text.secondary">
        Matrix Agent
      </Typography>
      <Chip
        size="small"
        label={isOnline ? "Online" : "Offline"}
        color={isOnline ? "success" : "default"}
        variant="outlined"
        sx={{ fontWeight: 500 }}
      />
      {documentsCount > 0 && (
        <Chip
          size="small"
          label={`${documentsCount} docs`}
          color="primary"
          variant="outlined"
        />
      )}
    </Box>
  );
};

export default MatrixStatus;
