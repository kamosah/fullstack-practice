import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import {
  useConversations,
  useCreateConversation,
  useSendMessage,
} from "./hooks/useChat";
import type { Conversation } from "./types/chat";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

interface TableRow {
  id: string;
  document: string;
  date: string;
  documentType: string;
  investmentRisks: string;
  marketConsiderations: string;
}

const AppContent: React.FC = () => {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const { data: conversations = [], isLoading } = useConversations();
  const createConversationMutation = useCreateConversation();
  const sendMessageMutation = useSendMessage();

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

  const handleConversationSelect = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };

  const handleNewConversation = () => {
    const title = `New Conversation ${new Date().toLocaleDateString()}`;
    createConversationMutation.mutate(
      { title },
      {
        onSuccess: (newConversation) => {
          setActiveConversation(newConversation);
        },
      }
    );
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversation) return;

    setIsTyping(true);

    try {
      // Send user message
      await sendMessageMutation.mutateAsync({
        conversationId: parseInt(activeConversation.id),
        type: "user",
        content,
      });

      // Simulate agent response after a short delay
      setTimeout(async () => {
        try {
          const agentResponse = generateAgentResponse();
          await sendMessageMutation.mutateAsync({
            conversationId: parseInt(activeConversation.id),
            type: "agent",
            content: agentResponse,
          });
        } catch (error) {
          console.error("Error sending agent message:", error);
        } finally {
          setIsTyping(false);
        }
      }, 2000);
    } catch (error) {
      console.error("Error sending user message:", error);
      setIsTyping(false);
    }
  };

  const generateAgentResponse = (): string => {
    // Simple response generation - in a real app, this would call an AI service
    const responses = [
      "Based on the documents provided, I can help you analyze the key considerations. Let me break this down for you...",
      "That's an excellent question. Looking at the financial data and market analysis, here are my thoughts...",
      "I've reviewed the relevant documents and identified several important factors to consider...",
      "From my analysis of the portfolio data, I can provide insights on the following areas...",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
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

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Loading conversations...
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex h="100vh">
        <Sidebar
          conversations={conversations}
          onSelectConversation={handleConversationSelect}
          onNewConversation={handleNewConversation}
          activeConversation={activeConversation}
        />
        <MainContent
          activeConversation={activeConversation}
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

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
