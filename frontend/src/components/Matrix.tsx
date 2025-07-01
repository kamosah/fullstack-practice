import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  HStack,
  Table as ChakraTable,
  Icon,
  IconButton,
  Badge,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuPlus,
  LuColumns2,
  LuChevronDown,
  LuGripVertical,
} from "react-icons/lu";
import type { TableColumn } from "../utils/mock/tableData";

interface TableRow {
  id: string;
  [key: string]: string | number | boolean;
}

interface TableSectionProps {
  rows: TableRow[];
  columns: TableColumn[];
  onAddRow: () => void;
  onUpdateRow: (id: string, field: string, value: string) => void;
}

const Table: React.FC<TableSectionProps> = ({
  rows,
  columns,
  onAddRow,
  onUpdateRow,
}) => {
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCellClick = (
    rowId: string,
    field: string,
    currentValue: string | number | boolean
  ) => {
    setEditingCell({ rowId, field });
    setEditValue(String(currentValue));
  };

  const handleCellSave = () => {
    if (editingCell) {
      onUpdateRow(editingCell.rowId, editingCell.field, editValue);
      setEditingCell(null);
      setEditValue("");
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCellSave();
    } else if (e.key === "Escape") {
      handleCellCancel();
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "financials":
        return "purple";
      case "marketing materials":
        return "blue";
      case "product":
        return "orange";
      case "customer":
        return "green";
      case "public report":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <Box
      h="100%"
      display="flex"
      flexDirection="column"
      bg="white"
      overflow="hidden"
    >
      {/* Toolbar */}
      <Box
        p={4}
        borderBottom="1px"
        borderColor="gray.200"
        bg="gray.50"
        flexShrink={0}
      >
        <Flex justify="space-between" align="center">
          <HStack gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                /* Handle add document */
              }}
            >
              <LuPlus />
              Add documents
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                /* Handle add columns */
              }}
            >
              <LuColumns2 />
              Add columns
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Table */}
      <Box
        flex={1}
        overflowY="auto"
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "3px",
          },
        }}
      >
        <ChakraTable.Root size="sm" variant="outline">
          <ChakraTable.Header bg="gray.50" position="sticky" top={0} zIndex={1}>
            <ChakraTable.Row>
              <ChakraTable.ColumnHeader width="40px" textAlign="center">
                #
              </ChakraTable.ColumnHeader>
              {columns.map((column) => (
                <ChakraTable.ColumnHeader
                  key={column.id}
                  minWidth={column.minWidth}
                  maxWidth={column.maxWidth}
                  width={column.width}
                >
                  <HStack gap={2}>
                    {column.icon && <Icon as={column.icon} boxSize={4} />}
                    <Text>{column.label}</Text>
                    {column.sortable && <Icon as={LuChevronDown} boxSize={3} />}
                  </HStack>
                </ChakraTable.ColumnHeader>
              ))}
            </ChakraTable.Row>
          </ChakraTable.Header>
          <ChakraTable.Body>
            {rows.map((row, index) => (
              <ChakraTable.Row
                key={row.id}
                _hover={{ bg: "blue.50" }}
                transition="background-color 0.2s"
                borderLeft="3px solid transparent"
                _focusWithin={{
                  bg: "blue.50",
                  borderLeftColor: "blue.500",
                }}
              >
                <ChakraTable.Cell textAlign="center">
                  <HStack gap={2} justify="center">
                    <Icon
                      as={LuGripVertical}
                      color="gray.400"
                      boxSize={4}
                      cursor="grab"
                    />
                    <Text fontSize="sm" color="gray.600">
                      {index + 1}
                    </Text>
                  </HStack>
                </ChakraTable.Cell>
                {columns.map((column) => {
                  const value = row[column.key];
                  const stringValue = String(value || "");

                  return (
                    <ChakraTable.Cell
                      key={column.id}
                      maxWidth={column.maxWidth}
                    >
                      {editingCell?.rowId === row.id &&
                      editingCell?.field === column.key ? (
                        // Editing mode
                        column.type === "textarea" ? (
                          <Textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleCellSave}
                            onKeyDown={handleKeyPress}
                            size="sm"
                            autoFocus
                            resize="none"
                            rows={2}
                          />
                        ) : (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleCellSave}
                            onKeyDown={handleKeyPress}
                            size="sm"
                            autoFocus
                          />
                        )
                      ) : // Display mode
                      column.type === "badge" ? (
                        <Badge
                          colorScheme={getDocumentTypeColor(stringValue)}
                          variant="subtle"
                          cursor="pointer"
                          onClick={() =>
                            handleCellClick(row.id, column.key, value)
                          }
                        >
                          {stringValue || "Add type"}
                        </Badge>
                      ) : column.type === "textarea" ? (
                        <Text
                          fontSize="sm"
                          cursor="pointer"
                          lineClamp={2}
                          color={
                            stringValue.includes("Not in document")
                              ? "gray.500"
                              : "inherit"
                          }
                          fontStyle={
                            stringValue.includes("Not in document")
                              ? "italic"
                              : "normal"
                          }
                          onClick={() =>
                            handleCellClick(row.id, column.key, value)
                          }
                        >
                          {stringValue || "Click to add details"}
                        </Text>
                      ) : (
                        <Text
                          fontSize="sm"
                          fontWeight={
                            column.key === "document" ? "medium" : "normal"
                          }
                          color={
                            column.key === "document" ? "blue.600" : "inherit"
                          }
                          cursor="pointer"
                          _hover={
                            column.key === "document"
                              ? { textDecoration: "underline" }
                              : undefined
                          }
                          onClick={() =>
                            handleCellClick(row.id, column.key, value)
                          }
                        >
                          {stringValue ||
                            (column.key === "document"
                              ? "Click to add document"
                              : "Add value")}
                        </Text>
                      )}
                    </ChakraTable.Cell>
                  );
                })}
              </ChakraTable.Row>
            ))}
            {/* Add Row */}
            <ChakraTable.Row _hover={{ bg: "gray.50" }}>
              <ChakraTable.Cell textAlign="center">
                <IconButton
                  aria-label="Add row"
                  size="sm"
                  variant="ghost"
                  onClick={onAddRow}
                  colorScheme="blue"
                >
                  <LuPlus />
                </IconButton>
              </ChakraTable.Cell>
              <ChakraTable.Cell colSpan={columns.length}>
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                  Add row
                </Text>
              </ChakraTable.Cell>
            </ChakraTable.Row>
          </ChakraTable.Body>
        </ChakraTable.Root>
      </Box>
    </Box>
  );
};

export default Table;
