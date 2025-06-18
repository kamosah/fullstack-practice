import { Box, Flex, Heading, Text, Avatar, HStack } from "@chakra-ui/react";
import { useState } from "react";
import ChatSection from "./ChatSection";
import TableSection from "./TableSection";
import HelpTooltip from "./HelpTooltip";
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
}

const MainContent: React.FC<MainContentProps> = ({
  activeConversation,
  tableData,
  onSendMessage,
  onAddRow,
  onUpdateRow,
  isTyping = false,
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
      {/* Header */}

      <Header activeConversation={activeConversation} />

      {/* Resizable Content */}
      <Box flex={1} position="relative" overflow="hidden" height="100%">
        <PanelGroup direction="vertical">
          <Panel defaultSize={50} minSize={20} maxSize={80}>
            <ChatSection
              messages={activeConversation ? activeConversation.messages : []}
              onSendMessage={onSendMessage}
              isTyping={isTyping}
              isDisabled={false}
            />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={50} minSize={20} maxSize={80}>
            <TableSection
              data={tableData}
              onAddRow={onAddRow}
              onUpdateRow={onUpdateRow}
            />
          </Panel>
        </PanelGroup>
      </Box>
    </Box>
  );
};

const Header = ({
  activeConversation,
}: {
  activeConversation: Conversation | null;
}) => {
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
    <Box p={6} borderBottom="1px" borderColor="gray.200" flexShrink={0}>
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
            {/* <Avatar.Image src="" /> */}
            <Avatar.Fallback name="User" />
          </Avatar.Root>
        </HStack>
      </Flex>
    </Box>
  );
};

export default MainContent;
