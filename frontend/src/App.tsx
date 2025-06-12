import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import DocumentList from "./components/DocumentList";
import DocumentModal from "./components/DocumentModal";
import type { DocumentFilter } from "./types/graphql";

const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DocumentFilter>({});
  const [selectedDocument, setSelectedDocument] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  const handleSearch = (search: string) => {
    setSearch(search);
    setFilter((prev) => ({ ...prev, search }));
  };

  const handleFilter = (newFilter: { category?: string }) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleView = (id: number) => {
    // Mock document fetch
    setSelectedDocument({ id, title: `Doc ${id}`, content: "Sample content" });
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Document Search Dashboard</Heading>
      <Flex>
        <Box w="250px" mr={6}>
          <FilterPanel onFilter={handleFilter} />
        </Box>
        <Box flex={1}>
          <SearchBar onSearch={handleSearch} />
          <DocumentList filter={filter} search={search} onView={handleView} />
        </Box>
      </Flex>
      <DocumentModal
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />
    </Box>
  );
};

export default App;
