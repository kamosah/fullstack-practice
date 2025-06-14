import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
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
      p={8}
      bg="red.50"
      borderRadius="lg"
      border="1px"
      borderColor="red.200"
      textAlign="center"
    >
      <VStack gap={4}>
        <Box
          w={12}
          h={12}
          bg="red.100"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LuInfo size={24} color="#E53E3E" />
        </Box>

        <VStack gap={2}>
          <Heading size="md" color="red.700">
            Oops! Something went wrong
          </Heading>
          <Text color="red.600" fontSize="sm">
            {error}
          </Text>
        </VStack>

        {onRetry && (
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={onRetry}
          >
            <LuRefreshCw />
            Try Again
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default ErrorBoundary;
