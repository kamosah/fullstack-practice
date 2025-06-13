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
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
        <Box maxW="8xl" mx="auto" px={8} py={6}>
          <Heading size="2xl" color="gray.800" fontWeight="bold">
            Document Search Dashboard
          </Heading>
        </Box>
      </Box>

      {/* Main Content */}
      <Box maxW="8xl" mx="auto" px={8} py={8}>
        <Flex gap={8} align="start">
          {/* Sidebar */}
          <Box w="280px" flexShrink={0}>
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              shadow="sm"
              border="1px"
              borderColor="gray.200"
            >
              <FilterPanel onFilter={handleFilter} />
            </Box>
          </Box>

          {/* Main Content Area */}
          <Box flex={1} minW="0">
            {/* Search Bar */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              shadow="sm"
              border="1px"
              borderColor="gray.200"
              mb={6}
            >
              <SearchBar onSearch={handleSearch} />
            </Box>

            {/* Document List */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              shadow="sm"
              border="1px"
              borderColor="gray.200"
            >
              <DocumentList
                filter={filter}
                search={search}
                onView={handleView}
              />
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Modal */}
      <DocumentModal
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />
    </Box>
  );
};

export default App;
