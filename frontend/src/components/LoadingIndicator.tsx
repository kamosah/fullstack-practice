import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingIndicatorProps {
  text?: string;
  size?: number | "small" | "medium" | "large";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  text = "Loading...",
  size = 40,
}) => {
  return (
    <Box
      minHeight={120}
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress size={size} color="primary" thickness={4} />
        <Typography color="text.secondary" variant="body2" fontWeight={500}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoadingIndicator;
