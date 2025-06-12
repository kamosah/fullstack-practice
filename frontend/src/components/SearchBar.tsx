import { Input, InputGroup, Icon } from "@chakra-ui/react";
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
    <InputGroup
      startElement={
        <Icon pointerEvents="none" as={FaSearch} color="gray.300" />
      }
    >
      <Input
        placeholder="Search documents..."
        value={search}
        onChange={handleSearch}
      />
    </InputGroup>
  );
};

export default SearchBar;
