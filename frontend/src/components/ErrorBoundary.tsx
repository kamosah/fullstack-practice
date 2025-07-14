import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LuRefreshCw, LuInfo } from "react-icons/lu";

interface ErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error = "Something went wrong",
  onRetry,
}) => {
  return (
    <Box
      sx={{
        p: 6,
        bgcolor: "error.lighter",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "error.light",
        textAlign: "center",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            bgcolor: "error.light",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LuInfo size={24} color="#E53E3E" />
        </Box>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h6" color="error.dark">
            Oops! Something went wrong
          </Typography>
          <Typography color="error.main" variant="body2">
            {error}
          </Typography>
        </Stack>
        {onRetry && (
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={onRetry}
            startIcon={<LuRefreshCw />}
          >
            Try Again
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ErrorBoundary;
