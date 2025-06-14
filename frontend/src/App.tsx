import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { getAgentResponse } from "./utils/mockResponses";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";

interface Matrix {
  id: string;
  name: string;
  lastEdited: Date;
  active: boolean;
}

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
}

interface TableRow {
  id: string;
  document: string;
  date: string;
  documentType: string;
  investmentRisks: string;
  marketConsiderations: string;
}

const App: React.FC = () => {
  const [activeMatrix, setActiveMatrix] = useState<Matrix>({
    id: "1",
    name: "First Screen Project Alpha",
    lastEdited: new Date(),
    active: true,
  });

  const [matrices] = useState<Matrix[]>([
    {
      id: "1",
      name: "First Screen Project Alpha",
      lastEdited: new Date(),
      active: true,
    },
    {
      id: "2",
      name: "Q324 Portfolio Review",
      lastEdited: new Date(Date.now() - 86400000),
      active: false,
    },
    {
      id: "3",
      name: "Hannibal Revenue",
      lastEdited: new Date(Date.now() - 172800000),
      active: false,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "user",
      content:
        "We are meeting the management team of Project Alpha tomorrow. Draft some key DD questions based on your assessment of these documents.",
      timestamp: new Date(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const [tableData, setTableData] = useState<TableRow[]>([
    {
      id: "1",
      document: "FY2024 P&L",
      date: "Jan 18, 2024",
      documentType: "Financials",
      investmentRisks: "There have been increasing costs related to...",
      marketConsiderations: "Not in document, click to view explanation",
    },
    {
      id: "2",
      document: "Project Alpha CIM",
      date: "Apr 29, 2024",
      documentType: "Marketing Materials",
      investmentRisks: "Risk factors that are not detailed in the CIM...",
      marketConsiderations: "Despite the growing TAM described within th...",
    },
    {
      id: "3",
      document: "Product Overview Alpha",
      date: "Feb 26, 2024",
      documentType: "Product",
      investmentRisks: "Current product lacks detail regarding the mo...",
      marketConsiderations: "Not in document, click to view explanation",
    },
  ]);

  const handleMatrixSelect = (matrix: Matrix) => {
    setActiveMatrix(matrix);
  };

  const handleNewMatrix = () => {
    const newMatrix: Matrix = {
      id: Date.now().toString(),
      name: "New Matrix",
      lastEdited: new Date(),
      active: true,
    };
    setActiveMatrix(newMatrix);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "n",
      metaKey: true, // Cmd+N on Mac
      ctrlKey: true, // Ctrl+N on Windows/Linux
      callback: () => handleNewMatrix(),
    },
    {
      key: "k",
      metaKey: true, // Cmd+K on Mac
      ctrlKey: true, // Ctrl+K on Windows/Linux
      callback: () => {
        // Focus search input - we'll implement this later
        console.log("Focus search");
      },
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: getAgentResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: Date.now().toString(),
      document: "",
      date: new Date().toLocaleDateString(),
      documentType: "",
      investmentRisks: "",
      marketConsiderations: "",
    };
    setTableData((prev) => [...prev, newRow]);
  };

  const handleUpdateRow = (
    id: string,
    field: keyof TableRow,
    value: string
  ) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex h="100vh">
        <Sidebar
          matrices={matrices}
          onSelectMatrix={handleMatrixSelect}
          onNewMatrix={handleNewMatrix}
        />
        <MainContent
          activeMatrix={activeMatrix}
          messages={messages}
          tableData={tableData}
          onSendMessage={handleSendMessage}
          onAddRow={handleAddRow}
          onUpdateRow={handleUpdateRow}
          isTyping={isTyping}
        />
      </Flex>
    </Box>
  );
};

export default App;
