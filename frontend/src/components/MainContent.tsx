import { Box, Grid, GridItem } from "@chakra-ui/react";
import Chat from "./Chat";
import Matrix from "./Matrix";
import DragResizeHandle from "./DragResizeHandle";
import { MessageType } from "../types/chat";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useConversation,
  useCreateConversationWithMessage,
  useSendMessage,
} from "../hooks/useChat";
import {
  TABLE_ROWS,
  TABLE_COLUMNS,
  type TableColumn,
} from "../utils/mock/tableData";

interface TableRow {
  id: string;
  document: string;
  date: string;
  documentType: string;
  investmentRisks: string;
  marketConsiderations: string;
}

const MainContent: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  const { data: activeConversation, isLoading } = useConversation(
    conversationId ? parseInt(conversationId) : 0
  );

  const createConversationWithMessageMutation =
    useCreateConversationWithMessage();
  const sendMessageMutation = useSendMessage();

  const [rows, setRows] = useState<TableRow[]>(
    TABLE_ROWS.map((row) => ({
      id: row.id,
      document: row.document as string,
      date: row.date as string,
      documentType: row.documentType as string,
      investmentRisks: row.investmentRisks as string,
      marketConsiderations: row.marketConsiderations as string,
    }))
  );
  const [tableColumns] = useState<TableColumn[]>(TABLE_COLUMNS);

  const onSendMessage = async (message: string) => {
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

  const onAddRow = () => {
    const newRow: TableRow = {
      id: Date.now().toString(),
      document: "",
      date: new Date().toLocaleDateString(),
      documentType: "",
      investmentRisks: "",
      marketConsiderations: "",
    };
    setRows((prev) => [...prev, newRow]);
  };

  const onUpdateRow = (id: string, field: string, value: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
  return (
    <Box
      flex={1}
      bg="gray.100"
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
    >
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <Grid
            py={10}
            templateColumns="repeat(12, 1fr)"
            height="100%"
            overflow="hidden"
          >
            <GridItem colSpan={2}></GridItem>
            <GridItem
              p={4}
              colSpan={8}
              display="flex"
              flexDirection="column"
              minH={0}
            >
              <Chat
                messages={activeConversation?.messages ?? []}
                onSendMessage={onSendMessage}
                isTyping={isTyping}
                isDisabled={isLoading}
              />
            </GridItem>
            <GridItem colSpan={2}></GridItem>
          </Grid>
        </Panel>
        {rows?.length > 0 && (
          <>
            <PanelResizeHandle>
              <DragResizeHandle />
            </PanelResizeHandle>
            <Panel defaultSize={50} minSize={20} maxSize={80}>
              <Matrix
                rows={rows.map((row) => ({ ...row }))}
                columns={tableColumns}
                onAddRow={onAddRow}
                onUpdateRow={onUpdateRow}
              />
            </Panel>
          </>
        )}
      </PanelGroup>
    </Box>
  );
};

export default MainContent;
