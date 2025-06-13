import { Box, Button, Text, Spinner, Center } from "@chakra-ui/react";
import DocumentCard from "./DocumentCard";
import useDocuments from "../hooks/useDocuments";
import type { DocumentFilter } from "../types/graphql";

interface DocumentListProps {
  filter: DocumentFilter;
  search: string;
  onView: (id: number) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  filter,
  search,
  onView,
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDocuments(filter);

  if (isLoading)
    return (
      <Center py={12}>
        <Box textAlign="center">
          <Spinner size="lg" color="blue.500" mb={4} />
          <Text color="gray.600">Loading documents...</Text>
        </Box>
      </Center>
    );

  // Flatten all documents from all pages
  const allDocuments = data?.pages.flatMap((page) => page.listDocuments) ?? [];

  return (
    <Box>
      {allDocuments.length === 0 ? (
        <Box textAlign="center" py={12} color="gray.500">
          <Text fontSize="lg" mb={2}>
            No documents found
          </Text>
          <Text fontSize="sm">Try adjusting your search or filters</Text>
        </Box>
      ) : (
        <Box>
          <Text fontSize="sm" color="gray.600" mb={6} fontWeight="medium">
            {allDocuments.length}{" "}
            {allDocuments.length === 1 ? "document" : "documents"} found
          </Text>

          {allDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              search={search}
              onView={onView}
            />
          ))}
        </Box>
      )}

      {hasNextPage && (
        <Box textAlign="center" mt={8}>
          <Button
            onClick={() => fetchNextPage()}
            colorScheme="blue"
            variant="outline"
            size="md"
            loading={isFetchingNextPage}
            loadingText="Loading more..."
            px={8}
          >
            Load More Documents
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DocumentList;
