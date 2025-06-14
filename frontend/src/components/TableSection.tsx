import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  HStack,
  Table,
  Icon,
  IconButton,
  Badge,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuPlus,
  LuColumns2,
  LuFile,
  LuCalendar,
  LuChevronDown,
  LuGripVertical,
} from "react-icons/lu";

interface TableRow {
  id: string;
  document: string;
  date: string;
  documentType: string;
  investmentRisks: string;
  marketConsiderations: string;
}

interface TableSectionProps {
  data: TableRow[];
  onAddRow: () => void;
  onUpdateRow: (id: string, field: keyof TableRow, value: string) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  data,
  onAddRow,
  onUpdateRow,
}) => {
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: keyof TableRow;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCellClick = (
    rowId: string,
    field: keyof TableRow,
    currentValue: string
  ) => {
    setEditingCell({ rowId, field });
    setEditValue(currentValue);
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
    <Box h="100%" display="flex" flexDirection="column" bg="white">
      {/* Toolbar */}
      <Box p={4} borderBottom="1px" borderColor="gray.200" bg="gray.50">
        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="gray.600">
            Display
          </Text>
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
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
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
        <Table.Root size="sm" variant="outline">
          <Table.Header bg="gray.50" position="sticky" top={0} zIndex={1}>
            <Table.Row>
              <Table.ColumnHeader width="40px" textAlign="center">
                #
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth="200px">
                <HStack gap={2}>
                  <Icon as={LuFile} boxSize={4} />
                  <Text>Document</Text>
                  <Icon as={LuChevronDown} boxSize={3} />
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth="120px">
                <HStack gap={2}>
                  <Icon as={LuCalendar} boxSize={4} />
                  <Text>Date</Text>
                  <Icon as={LuChevronDown} boxSize={3} />
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth="150px">
                Document Type
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth="300px">
                Investment Risks
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth="300px">
                Market Considerations
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row, index) => (
              <Table.Row
                key={row.id}
                _hover={{ bg: "blue.50" }}
                transition="background-color 0.2s"
                borderLeft="3px solid transparent"
                _focusWithin={{
                  bg: "blue.50",
                  borderLeftColor: "blue.500",
                }}
              >
                <Table.Cell textAlign="center">
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
                </Table.Cell>
                <Table.Cell>
                  {editingCell?.rowId === row.id &&
                  editingCell?.field === "document" ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleCellSave}
                      onKeyDown={handleKeyPress}
                      size="sm"
                      autoFocus
                    />
                  ) : (
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="blue.600"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() =>
                        handleCellClick(row.id, "document", row.document)
                      }
                    >
                      {row.document || "Click to add document"}
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingCell?.rowId === row.id &&
                  editingCell?.field === "date" ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleCellSave}
                      onKeyDown={handleKeyPress}
                      size="sm"
                      autoFocus
                    />
                  ) : (
                    <Text
                      fontSize="sm"
                      cursor="pointer"
                      onClick={() => handleCellClick(row.id, "date", row.date)}
                    >
                      {row.date}
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingCell?.rowId === row.id &&
                  editingCell?.field === "documentType" ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleCellSave}
                      onKeyDown={handleKeyPress}
                      size="sm"
                      autoFocus
                    />
                  ) : (
                    <Badge
                      colorScheme={getDocumentTypeColor(row.documentType)}
                      variant="subtle"
                      cursor="pointer"
                      onClick={() =>
                        handleCellClick(
                          row.id,
                          "documentType",
                          row.documentType
                        )
                      }
                    >
                      {row.documentType || "Add type"}
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell maxWidth="300px">
                  {editingCell?.rowId === row.id &&
                  editingCell?.field === "investmentRisks" ? (
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
                    <Text
                      fontSize="sm"
                      cursor="pointer"
                      lineClamp={2}
                      onClick={() =>
                        handleCellClick(
                          row.id,
                          "investmentRisks",
                          row.investmentRisks
                        )
                      }
                    >
                      {row.investmentRisks || "Click to add details"}
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell maxWidth="300px">
                  {editingCell?.rowId === row.id &&
                  editingCell?.field === "marketConsiderations" ? (
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
                    <Text
                      fontSize="sm"
                      cursor="pointer"
                      lineClamp={2}
                      color={
                        row.marketConsiderations.includes("Not in document")
                          ? "gray.500"
                          : "inherit"
                      }
                      fontStyle={
                        row.marketConsiderations.includes("Not in document")
                          ? "italic"
                          : "normal"
                      }
                      onClick={() =>
                        handleCellClick(
                          row.id,
                          "marketConsiderations",
                          row.marketConsiderations
                        )
                      }
                    >
                      {row.marketConsiderations || "Click to add details"}
                    </Text>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
            {/* Add Row */}
            <Table.Row _hover={{ bg: "gray.50" }}>
              <Table.Cell textAlign="center">
                <IconButton
                  aria-label="Add row"
                  size="sm"
                  variant="ghost"
                  onClick={onAddRow}
                  colorScheme="blue"
                >
                  <LuPlus />
                </IconButton>
              </Table.Cell>
              <Table.Cell colSpan={5}>
                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                  Add row
                </Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default TableSection;
