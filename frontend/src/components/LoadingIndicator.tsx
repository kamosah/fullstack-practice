import { Spinner, Text, VStack } from "@chakra-ui/react";

interface LoadingIndicatorProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading...",
  size = "md",
}) => {
  return (
    <VStack gap={3} py={8}>
      <Spinner size={size} color="blue.500" />
      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        {message}
      </Text>
    </VStack>
  );
};

export default LoadingIndicator;
