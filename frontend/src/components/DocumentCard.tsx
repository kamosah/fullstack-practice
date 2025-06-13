import { Box, Text, Button, Flex, Highlight } from "@chakra-ui/react";
import type { ListDocumentsQuery } from "../types/graphql";

interface DocumentCardProps {
  document: ListDocumentsQuery["listDocuments"][0];
  search: string;
  onView: (id: number) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  search,
  onView,
}) => {
  return (
    <Box
      p={6}
      bg="white"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      mb={6}
      shadow="sm"
      transition="all 0.2s"
      _hover={{
        shadow: "md",
        transform: "translateY(-1px)",
        borderColor: "blue.300",
      }}
    >
      <Text
        fontWeight="bold"
        fontSize="lg"
        mb={3}
        color="gray.800"
        lineHeight="short"
      >
        <Highlight
          query={search}
          styles={{
            bg: "yellow.200",
            color: "gray.800",
            px: 0.5,
            borderRadius: "sm",
          }}
        >
          {document.title}
        </Highlight>
      </Text>

      <Text
        fontSize="md"
        color="gray.600"
        lineHeight="relaxed"
        mb={4}
        lineClamp={3}
      >
        <Highlight
          query={search}
          styles={{
            bg: "yellow.200",
            color: "gray.800",
            px: 0.5,
            borderRadius: "sm",
          }}
        >
          {document.content}
        </Highlight>
      </Text>

      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {new Date(document.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>

        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          onClick={() => onView(document.id)}
          _hover={{
            bg: "blue.50",
            transform: "translateY(-1px)",
          }}
        >
          View Details
        </Button>
      </Flex>
    </Box>
  );
};

export default DocumentCard;
