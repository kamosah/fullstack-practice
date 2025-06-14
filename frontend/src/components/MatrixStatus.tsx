import { Text, HStack, Icon, Badge } from "@chakra-ui/react";
import { LuWifi } from "react-icons/lu";

interface MatrixStatusProps {
  isActive?: boolean;
  documentsCount?: number;
}

const MatrixStatus: React.FC<MatrixStatusProps> = ({
  isActive = true,
  documentsCount = 0,
}) => {
  return (
    <HStack gap={2} p={2} bg="gray.50" borderRadius="md">
      <Icon
        as={LuWifi}
        boxSize={4}
        color={isActive ? "green.500" : "gray.400"}
      />
      <Text fontSize="xs" color="gray.600">
        Matrix Agent
      </Text>
      <Badge
        size="sm"
        colorScheme={isActive ? "green" : "gray"}
        variant="subtle"
      >
        {isActive ? "Online" : "Offline"}
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
