import { Input, InputGroup, Icon, Box, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>
        Search Documents
      </Text>

      <InputGroup
        startElement={
          <Icon pointerEvents="none" as={FaSearch} color="gray.400" ml={4} />
        }
      >
        <Input
          placeholder="Search by title, content, or keywords..."
          value={search}
          onChange={handleSearch}
          bg="gray.50"
          border="1px"
          borderColor="gray.300"
          borderRadius="lg"
          pl={12}
          _hover={{
            borderColor: "blue.300",
            bg: "white",
          }}
          _focus={{
            borderColor: "blue.400",
            bg: "white",
            shadow: "0 0 0 1px var(--chakra-colors-blue-400)",
          }}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
