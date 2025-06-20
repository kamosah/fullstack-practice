import { Box, Center } from "@chakra-ui/react";
import { MdDragHandle } from "react-icons/md";

/**
 * Custom resize handle component for react-resizable-panels
 * Provides a visual indicator with hover and active states
 */
const DragResizeHandle: React.FC = () => (
  <Box
    position="relative"
    height="4px"
    bg="gray.200"
    cursor="row-resize"
    _hover={{
      bg: "blue.300",
    }}
    _active={{
      bg: "blue.400",
    }}
    transition="background-color 0.2s"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Center
      position="absolute"
      bg="gray.400"
      _hover={{
        bg: "blue.500",
      }}
      _active={{
        bg: "blue.600",
      }}
      borderRadius="full"
      width="24px"
      height="12px"
      transition="all 0.2s"
    >
      <MdDragHandle size={16} color="white" />
    </Center>
  </Box>
);

export default DragResizeHandle;
