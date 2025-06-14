import {
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Popover,
} from "@chakra-ui/react";
import { BiHelpCircle } from "react-icons/bi";

const HelpTooltip: React.FC = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton
          aria-label="Help"
          size="sm"
          variant="ghost"
          color="gray.500"
          _hover={{ color: "gray.700" }}
        >
          <BiHelpCircle />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content bg="gray.800" color="white" p={3} maxW="280px">
        <VStack gap={2} align="start">
          <Text fontSize="sm" fontWeight="semibold">
            Keyboard Shortcuts
          </Text>
          <HStack gap={4}>
            <Badge size="sm" colorScheme="gray">
              ⌘ + K
            </Badge>
            <Text fontSize="xs">Search matrices</Text>
          </HStack>
          <HStack gap={4}>
            <Badge size="sm" colorScheme="gray">
              ⌘ + N
            </Badge>
            <Text fontSize="xs">New chat</Text>
          </HStack>
          <HStack gap={4}>
            <Badge size="sm" colorScheme="gray">
              Enter
            </Badge>
            <Text fontSize="xs">Send message</Text>
          </HStack>
          <HStack gap={4}>
            <Badge size="sm" colorScheme="gray">
              ⇧ + Enter
            </Badge>
            <Text fontSize="xs">New line</Text>
          </HStack>
          <HStack gap={4}>
            <Badge size="sm" colorScheme="gray">
              Esc
            </Badge>
            <Text fontSize="xs">Cancel edit</Text>
          </HStack>
        </VStack>
      </Popover.Content>
    </Popover.Root>
  );
};

export default HelpTooltip;
