import { Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import MainContent from "./MainContent";
import { useState } from "react";
import {
  useConversation,
  useCreateConversationWithMessage,
  useSendMessage,
} from "../hooks/useChat";
import { MessageType } from "../types/chat";

interface TableRow {
  id: string;
  document: string;
  date: string;
  documentType: string;
  investmentRisks: string;
  marketConsiderations: string;
}

const ConversationView: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  // Use the useConversation hook to directly fetch the active conversation
  const { data: activeConversation, isLoading } = useConversation(
    conversationId ? parseInt(conversationId) : 0
  );

  console.log("ConversationView.Active Conversation:", activeConversation);

  const createConversationWithMessageMutation =
    useCreateConversationWithMessage();
  const sendMessageMutation = useSendMessage();

  const [tableData, setTableData] = useState<TableRow[]>([
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
  ]);

  const handleSendMessage = async (message: string) => {
    if (!activeConversation) {
      // Create new conversation with message
      try {
        setIsTyping(true);
        const newConversation =
          await createConversationWithMessageMutation.mutateAsync({
            title:
              message.substring(0, 50) + (message.length > 50 ? "..." : ""),
            firstMessage: message,
          });
        navigate(`/conversations/${newConversation.id}`);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    // Send message to existing conversation
    try {
      setIsTyping(true);
      await sendMessageMutation.mutateAsync({
        conversationId: parseInt(activeConversation.id),
        type: MessageType.USER,
        content: message,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsTyping(false);
    }
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
    <Box flex={1}>
      <MainContent
        activeConversation={activeConversation || null}
        tableData={tableData}
        onSendMessage={handleSendMessage}
        onAddRow={handleAddRow}
        onUpdateRow={handleUpdateRow}
        isTyping={isTyping}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ConversationView;
