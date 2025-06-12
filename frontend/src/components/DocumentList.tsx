import { Box, Button } from "@chakra-ui/react";
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

  if (isLoading) return <Box>Loading...</Box>;

  // Flatten all documents from all pages
  const allDocuments = data?.pages.flatMap((page) => page.listDocuments) ?? [];

  return (
    <Box>
      {allDocuments.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          search={search}
          onView={onView}
        />
      ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          mt={4}
          loading={isFetchingNextPage}
          //   loadingText="Loading more..."
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default DocumentList;
