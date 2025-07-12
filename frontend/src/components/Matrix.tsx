
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { LuPlus, LuChevronDown, LuGripVertical } from "react-icons/lu";
import type { TableColumn } from "../utils/mock/tableData";
import Toolbar from "./Toolbar";

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

const MatrixTable: React.FC<TableSectionProps> = ({
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

  // Map custom color names to valid MUI Chip color values
  const getDocumentTypeColor = (type: string): "primary" | "secondary" | "success" | "error" | "info" | "warning" | "default" => {
    switch (type.toLowerCase()) {
      case "financials":
        return "secondary";
      case "marketing materials":
        return "primary";
      case "product":
        return "warning";
      case "customer":
        return "success";
      case "public report":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <Toolbar />

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '3px',
          },
        }}
      >
        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ width: 40, textAlign: 'center', fontWeight: 600 }}>#</TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      width: column.width,
                      fontWeight: 600,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {column.icon && (
                        <Box component={column.icon} sx={{ fontSize: 18 }} />
                      )}
                      <Typography variant="body2">{column.label}</Typography>
                      {column.sortable && (
                        <Box component={LuChevronDown} sx={{ fontSize: 16, ml: 0.5 }} />
                      )}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    transition: 'background-color 0.2s',
                    borderLeft: '3px solid transparent',
                    '&:hover': { bgcolor: 'primary.50' },
                    '&:focus-within': {
                      bgcolor: 'primary.50',
                      borderLeftColor: 'primary.main',
                    },
                  }}
                >
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <Box component={LuGripVertical} sx={{ color: 'grey.400', fontSize: 18, cursor: 'grab' }} />
                      <Typography variant="caption" color="text.secondary">
                        {index + 1}
                      </Typography>
                    </Stack>
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.key];
                    const stringValue = String(value || "");

                    return (
                      <TableCell key={column.id} sx={{ maxWidth: column.maxWidth }}>
                        {editingCell?.rowId === row.id && editingCell?.field === column.key ? (
                          // Editing mode
                          column.type === 'textarea' ? (
                            <TextField
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={handleCellSave}
                              onKeyDown={handleKeyPress}
                              size="small"
                              autoFocus
                              multiline
                              minRows={2}
                            />
                          ) : (
                            <TextField
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={handleCellSave}
                              onKeyDown={handleKeyPress}
                              size="small"
                              autoFocus
                            />
                          )
                        ) : // Display mode
                        column.type === 'badge' ? (
                          <Chip
                            label={stringValue || 'Add type'}
                            color={getDocumentTypeColor(stringValue)}
                            variant="outlined"
                            size="small"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleCellClick(row.id, column.key, value)}
                          />
                        ) : column.type === 'textarea' ? (
                          <Typography
                            variant="body2"
                            sx={{
                              cursor: 'pointer',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              color: stringValue.includes('Not in document') ? 'text.secondary' : 'inherit',
                              fontStyle: stringValue.includes('Not in document') ? 'italic' : 'normal',
                            }}
                            onClick={() => handleCellClick(row.id, column.key, value)}
                          >
                            {stringValue || 'Click to add details'}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            fontWeight={column.key === 'document' ? 500 : 400}
                            color={column.key === 'document' ? 'primary.dark' : 'inherit'}
                            sx={{
                              cursor: 'pointer',
                              textDecoration: column.key === 'document' ? 'underline' : 'none',
                              '&:hover': {
                                textDecoration: column.key === 'document' ? 'underline' : 'none',
                              },
                            }}
                            onClick={() => handleCellClick(row.id, column.key, value)}
                          >
                            {stringValue || (column.key === 'document' ? 'Click to add document' : 'Add value')}
                          </Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              {/* Add Row */}
              <TableRow hover>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    aria-label="Add row"
                    size="small"
                    onClick={onAddRow}
                    color="primary"
                  >
                    <LuPlus />
                  </IconButton>
                </TableCell>
                <TableCell colSpan={columns.length}>
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    Add row
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MatrixTable;
