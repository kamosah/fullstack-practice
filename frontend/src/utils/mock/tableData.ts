import { LuFile, LuCalendar } from "react-icons/lu";
import type { ComponentType } from "react";

export interface TableColumn {
  id: string;
  key: string;
  label: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  icon?: ComponentType;
  sortable?: boolean;
  type?: "text" | "textarea" | "badge" | "date";
}

export interface TableRow {
  id: string;
  [key: string]: string | number | boolean; // Allow dynamic properties based on columns
}

export const TABLE_COLUMNS: TableColumn[] = [
  {
    id: "document",
    key: "document",
    label: "Document",
    minWidth: "200px",
    icon: LuFile,
    sortable: true,
    type: "text",
  },
  {
    id: "date",
    key: "date",
    label: "Date",
    minWidth: "120px",
    icon: LuCalendar,
    sortable: true,
    type: "date",
  },
  {
    id: "documentType",
    key: "documentType",
    label: "Document Type",
    minWidth: "150px",
    type: "badge",
  },
  {
    id: "investmentRisks",
    key: "investmentRisks",
    label: "Investment Risks",
    minWidth: "300px",
    maxWidth: "300px",
    type: "textarea",
  },
  {
    id: "marketConsiderations",
    key: "marketConsiderations",
    label: "Market Considerations",
    minWidth: "300px",
    maxWidth: "300px",
    type: "textarea",
  },
];

export const TABLE_ROWS: TableRow[] = [
  {
    id: "1",
    document: "FY2024 P&L",
    date: "Jan 18, 2024",
    documentType: "Financials",
    investmentRisks: "There have been increasing costs related to...",
    marketConsiderations: "The market has been volatile with...",
  },
  {
    id: "2",
    document: "Q4 Report",
    date: "Feb 03, 2024",
    documentType: "Quarterly",
    investmentRisks: "Seasonal fluctuations may impact...",
    marketConsiderations: "Economic indicators suggest...",
  },
  {
    id: "3",
    document: "Risk Assessment",
    date: "Feb 15, 2024",
    documentType: "Risk Analysis",
    investmentRisks: "Regulatory changes could affect...",
    marketConsiderations: "Current market conditions favor...",
  },
];

export const createNewTableRow = (columns: TableColumn[]): TableRow => {
  const newRow: TableRow = {
    id: Date.now().toString(),
  };

  columns.forEach((column) => {
    if (column.type === "date") {
      newRow[column.key] = new Date().toLocaleDateString();
    } else {
      newRow[column.key] = "";
    }
  });

  return newRow;
};
