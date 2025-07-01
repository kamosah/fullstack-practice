import { Box, Flex, HStack, Button, Icon } from "@chakra-ui/react";
import { LuPlus, LuColumns2 } from "react-icons/lu";
import { TbTableFilled } from "react-icons/tb";

export const Toolbar = () => {
  return (
    <Box
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      bg="gray.50"
      flexShrink={0}
    >
      <Flex justify="space-between" align="center">
        <Icon as={TbTableFilled} boxSize={6} color="blue.500" />
        <HStack gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              /* Handle add document */
            }}
          >
            <LuPlus />
            Add documents
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              /* Handle add columns */
            }}
          >
            <LuColumns2 />
            Add columns
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Toolbar;
