import {
  Box,
  Select,
  createListCollection,
  Portal,
  Text,
} from "@chakra-ui/react";
import { type SelectValueChangeDetails } from "@chakra-ui/react/select";
import { useState } from "react";

interface FilterPanelProps {
  onFilter: (filter: { category?: string }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (
    details: SelectValueChangeDetails<{ label: string; value: string }>
  ) => {
    const { value } = details;
    const [categoryValue] = value;
    setCategory(categoryValue);
    onFilter({ category: categoryValue || undefined });
  };

  const categories = createListCollection({
    items: [
      { label: "General", value: "General" },
      { label: "Tech", value: "Tech" },
    ],
  });

  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>
        Filter Documents
      </Text>

      <Select.Root
        collection={categories}
        width="100%"
        value={[category]}
        onValueChange={handleCategoryChange}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
          Category
        </Select.Label>
        <Select.Control>
          <Select.Trigger
            bg="gray.50"
            border="1px"
            borderColor="gray.300"
            borderRadius="lg"
            _hover={{
              borderColor: "blue.300",
              bg: "white",
            }}
            _focus={{
              borderColor: "blue.400",
              bg: "white",
              shadow: "0 0 0 1px var(--chakra-colors-blue-400)",
            }}
          >
            <Select.ValueText placeholder="All Categories" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content
              bg="white"
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
              shadow="lg"
            >
              {categories.items.map((category) => (
                <Select.Item
                  item={category}
                  key={category.value}
                  _hover={{
                    bg: "blue.50",
                  }}
                  px={4}
                  py={2}
                >
                  {category.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
};

export default FilterPanel;
