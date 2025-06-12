import { Box, Text, Button } from "@chakra-ui/react";
import { highlightText } from "../utils/highlightText";
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
    <Box p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Text fontWeight="bold">{highlightText(document.title, search)}</Text>
      <Text lineClamp={2}>{highlightText(document.content, search)}</Text>
      <Text fontSize="sm" color="gray.500">
        {new Date(document.createdAt).toLocaleDateString()}
      </Text>
      <Button mt={2} size="sm" onClick={() => onView(document.id)}>
        View Details
      </Button>
    </Box>
  );
};

export default DocumentCard;
