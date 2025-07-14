import Box from "@mui/material/Box";
import MatrixStatus from "../MatrixStatus";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const ChatHeader: React.FC = () => {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        flexShrink: 0,
        pb: 1,
        mb: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="text.primary">
          Chat
        </Typography>
        <MatrixStatus />
      </Stack>
    </Box>
  );
};

export default ChatHeader;
