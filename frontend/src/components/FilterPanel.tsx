import { Box, Select, createListCollection, Portal } from "@chakra-ui/react";
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
    // <Box as="form" p={4} bg="gray.50" borderRadius="md">
    <form>
      <Select.Root
        collection={categories}
        width="320px"
        value={[category]}
        onValueChange={handleCategoryChange}
      >
        <Select.HiddenSelect />
        <Select.Label>Category</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="All Categories" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categories.items.map((framework) => (
                <Select.Item item={framework} key={framework.value}>
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </form>
  );
};

export default FilterPanel;
