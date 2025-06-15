import { Box, Flex, Heading, Text, Avatar, HStack } from "@chakra-ui/react";
import { useState } from "react";
import ChatSection from "./ChatSection";
import TableSection from "./TableSection";
import ResizablePanel from "./ResizablePanel";
import HelpTooltip from "./HelpTooltip";
import type { Conversation } from "../types/chat";

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
}

const MainContent: React.FC<MainContentProps> = ({
  activeConversation,
  tableData,
  onSendMessage,
  onAddRow,
  onUpdateRow,
  isTyping = false,
}) => {
  const [chatHeight, setChatHeight] = useState(50); // Percentage of screen height

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Saved just now";
    if (diffInMinutes < 60) return `Saved ${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Saved ${diffInHours}h ago`;
    return `Saved ${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Box flex={1} bg="white" display="flex" flexDirection="column">
      {/* Header */}
      <Box p={6} borderBottom="1px" borderColor="gray.200">
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="gray.800" mb={1}>
              {activeConversation
                ? activeConversation.title
                : "Select a conversation"}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {activeConversation
                ? formatLastSaved(activeConversation.updatedAt)
                : "Choose a conversation from the sidebar to get started"}
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
              messages={activeConversation ? activeConversation.messages : []}
              onSendMessage={onSendMessage}
              isTyping={isTyping}
              isDisabled={!activeConversation}
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
