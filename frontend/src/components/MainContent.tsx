import { Box } from "@chakra-ui/react";
import ChatSection from "./ChatSection";
import TableSection from "./TableSection";
import DragResizeHandle from "./DragResizeHandle";
import type { Conversation } from "../types/chat";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

interface TableRow {
  id: string;
  document: string;
  date: string;
  documentType: string;
  investmentRisks: string;
  marketConsiderations: string;
}

interface MainContentProps {
  activeConversation: Conversation | null;
  tableData: TableRow[];
  onSendMessage: (content: string) => void;
  onAddRow: () => void;
  onUpdateRow: (id: string, field: keyof TableRow, value: string) => void;
  isTyping?: boolean;
  isLoading?: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  activeConversation,
  tableData,
  onSendMessage,
  onAddRow,
  onUpdateRow,
  isTyping = false,
  isLoading = false,
}) => {
  return (
    <Box
      flex={1}
      bg="white"
      display="flex"
      flexDirection="column"
      height="100vh"
      overflow="hidden"
    >
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <ChatSection
            messages={activeConversation ? activeConversation.messages : []}
            onSendMessage={onSendMessage}
            isTyping={isTyping}
            isDisabled={isLoading}
          />
        </Panel>
        <PanelResizeHandle>
          <DragResizeHandle />
        </PanelResizeHandle>
        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <TableSection
            data={tableData}
            onAddRow={onAddRow}
            onUpdateRow={onUpdateRow}
          />
        </Panel>
      </PanelGroup>
    </Box>
  );
};

export default MainContent;
