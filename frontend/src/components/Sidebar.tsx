import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { LuPlus, LuSearch, LuGrid3X3 } from "react-icons/lu";

interface Matrix {
  id: string;
  name: string;
  lastEdited: Date;
  active: boolean;
}

interface SidebarProps {
  matrices: Matrix[];
  onSelectMatrix: (matrix: Matrix) => void;
  onNewMatrix: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  matrices,
  onSelectMatrix,
  onNewMatrix,
}) => {
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  return (
    <Box
      w="320px"
      h="100vh"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box p={6} borderBottom="1px" borderColor="gray.100">
        <Flex align="center" justify="space-between" mb={4}>
          <HStack gap={2}>
            <Icon as={LuGrid3X3} boxSize={6} color="blue.500" />
            <Heading size="lg" color="gray.800">
              Hebbia
            </Heading>
          </HStack>
          <Button
            size="sm"
            colorScheme="blue"
            variant="solid"
            onClick={onNewMatrix}
          >
            <LuPlus />
            New Chat
          </Button>
        </Flex>

        {/* Search */}
        <Box position="relative">
          <Input
            placeholder="Search matrices"
            pl={10}
            bg="gray.50"
            border="1px"
            borderColor="gray.200"
            _hover={{ borderColor: "gray.300" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
          />
          <Icon
            as={LuSearch}
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            boxSize={4}
          />
        </Box>
      </Box>

      {/* Matrices List */}
      <Box flex={1} overflowY="auto">
        <Box p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Today
          </Text>
          <VStack gap={1} align="stretch">
            {matrices
              .filter((matrix) => {
                const today = new Date();
                const matrixDate = new Date(matrix.lastEdited);
                return matrixDate.toDateString() === today.toDateString();
              })
              .map((matrix) => (
                <Box
                  key={matrix.id}
                  p={3}
                  borderRadius="md"
                  cursor="pointer"
                  bg={matrix.active ? "blue.50" : "transparent"}
                  borderLeft={
                    matrix.active ? "3px solid" : "3px solid transparent"
                  }
                  borderLeftColor={matrix.active ? "blue.500" : "transparent"}
                  _hover={{ bg: matrix.active ? "blue.50" : "gray.50" }}
                  onClick={() => onSelectMatrix(matrix)}
                  transition="all 0.2s"
                >
                  <Text
                    fontSize="sm"
                    fontWeight={matrix.active ? "semibold" : "medium"}
                    color={matrix.active ? "blue.700" : "gray.800"}
                    lineClamp={2}
                    mb={1}
                  >
                    {matrix.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatRelativeTime(matrix.lastEdited)}
                  </Text>
                </Box>
              ))}
          </VStack>
        </Box>

        <Box p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Yesterday
          </Text>
          <VStack gap={1} align="stretch">
            {matrices
              .filter((matrix) => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const matrixDate = new Date(matrix.lastEdited);
                return matrixDate.toDateString() === yesterday.toDateString();
              })
              .map((matrix) => (
                <Box
                  key={matrix.id}
                  p={3}
                  borderRadius="md"
                  cursor="pointer"
                  bg={matrix.active ? "blue.50" : "transparent"}
                  borderLeft={
                    matrix.active ? "3px solid" : "3px solid transparent"
                  }
                  borderLeftColor={matrix.active ? "blue.500" : "transparent"}
                  _hover={{ bg: matrix.active ? "blue.50" : "gray.50" }}
                  onClick={() => onSelectMatrix(matrix)}
                  transition="all 0.2s"
                >
                  <Text
                    fontSize="sm"
                    fontWeight={matrix.active ? "semibold" : "medium"}
                    color={matrix.active ? "blue.700" : "gray.800"}
                    lineClamp={2}
                    mb={1}
                  >
                    {matrix.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatRelativeTime(matrix.lastEdited)}
                  </Text>
                </Box>
              ))}
          </VStack>
        </Box>

        <Box p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Projects
          </Text>
          <VStack gap={1} align="stretch">
            {matrices
              .filter((matrix) => {
                const twoDaysAgo = new Date();
                twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
                const matrixDate = new Date(matrix.lastEdited);
                return matrixDate < twoDaysAgo;
              })
              .map((matrix) => (
                <Box
                  key={matrix.id}
                  p={3}
                  borderRadius="md"
                  cursor="pointer"
                  bg={matrix.active ? "blue.50" : "transparent"}
                  borderLeft={
                    matrix.active ? "3px solid" : "3px solid transparent"
                  }
                  borderLeftColor={matrix.active ? "blue.500" : "transparent"}
                  _hover={{ bg: matrix.active ? "blue.50" : "gray.50" }}
                  onClick={() => onSelectMatrix(matrix)}
                  transition="all 0.2s"
                >
                  <Text
                    fontSize="sm"
                    fontWeight={matrix.active ? "semibold" : "medium"}
                    color={matrix.active ? "blue.700" : "gray.800"}
                    lineClamp={2}
                    mb={1}
                  >
                    {matrix.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatRelativeTime(matrix.lastEdited)}
                  </Text>
                </Box>
              ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
