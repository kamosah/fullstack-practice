import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
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
      <Typography variant="h6" fontWeight={600} color="grey.800" mb={2}>
        Search Documents
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Search by title, content, or keywords..."
        value={search}
        onChange={handleSearch}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ color: "#9ca3af", fontSize: 18 }} />
              </InputAdornment>
            ),
          },
          root: {
            sx: {
              bgcolor: "grey.50",
              borderRadius: 2,
              mt: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "grey.300",
                },
                "&:hover fieldset": {
                  borderColor: "primary.light",
                  bgcolor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  bgcolor: "white",
                  boxShadow: 1,
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
