import { Box, Flex, Heading, Text, Avatar, HStack } from "@chakra-ui/react";
import { useState } from "react";
import ChatSection from "./ChatSection";
import TableSection from "./TableSection";
import ResizablePanel from "./ResizablePanel";
import HelpTooltip from "./HelpTooltip";

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

interface MainContentProps {
  activeMatrix: Matrix;
  messages: Message[];
  tableData: TableRow[];
  onSendMessage: (content: string) => void;
  onAddRow: () => void;
  onUpdateRow: (id: string, field: keyof TableRow, value: string) => void;
  isTyping?: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  activeMatrix,
  messages,
  tableData,
  onSendMessage,
  onAddRow,
  onUpdateRow,
  isTyping = false,
}) => {
  const [chatHeight, setChatHeight] = useState(50); // Percentage of screen height

  const formatLastSaved = (date: Date) => {
    return `Saved at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <Box flex={1} display="flex" flexDirection="column" h="100vh">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200" px={6} py={4}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="md" color="gray.800" mb={1}>
              {activeMatrix.name}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {formatLastSaved(activeMatrix.lastEdited)}
            </Text>
          </Box>
          <HStack gap={3}>
            <HelpTooltip />
            <Avatar.Root size="sm">
              <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar.Fallback name="User" />
            </Avatar.Root>
          </HStack>
        </Flex>
      </Box>

      {/* Resizable Content */}
      <Box flex={1} position="relative">
        <ResizablePanel
          topContent={
            <ChatSection
              messages={messages}
              onSendMessage={onSendMessage}
              isTyping={isTyping}
            />
          }
          bottomContent={
            <TableSection
              data={tableData}
              onAddRow={onAddRow}
              onUpdateRow={onUpdateRow}
            />
          }
          initialTopHeight={chatHeight}
          onHeightChange={setChatHeight}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
