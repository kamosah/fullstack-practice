import { Text, HStack, Icon, Badge } from "@chakra-ui/react";
import { onlineManager } from "@tanstack/react-query";
import { LuWifi } from "react-icons/lu";

interface MatrixStatusProps {
  isActive?: boolean;
  documentsCount?: number;
}

const MatrixStatus: React.FC<MatrixStatusProps> = ({ documentsCount = 0 }) => {
  const isOnline = onlineManager.isOnline();

  return (
    <HStack gap={2} p={2} bg="gray.50" borderRadius="md">
      <Icon
        as={LuWifi}
        boxSize={4}
        color={isOnline ? "green.500" : "gray.400"}
      />
      <Text fontSize="xs" color="gray.600">
        Matrix Agent
      </Text>
      <Badge
        size="sm"
        colorScheme={isOnline ? "green" : "gray"}
        variant="subtle"
      >
        {isOnline ? "Online" : "Offline"}
      </Badge>
      {documentsCount > 0 && (
        <Badge size="sm" colorScheme="blue" variant="subtle">
          {documentsCount} docs
        </Badge>
      )}
    </HStack>
  );
};

export default MatrixStatus;
