import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Uploady from "@rpldy/uploady";
import type { Message, Attachment } from "../../types/chat";
import { useUploadConfig } from "../../hooks/useUploadConfig";
import ChatInput from "../ChatInput";
import ChatMessageList from "./ChatMessageList";
import ChatHeader from "./ChatHeader";

interface ChatProps {
  isDisabled?: boolean;
  isTyping?: boolean;
  messages: Message[];
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
}

const Chat: React.FC<ChatProps> = ({
  isDisabled = false,
  isTyping = false,
  messages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const uploadConfig = useUploadConfig();

  return (
    <Paper
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        borderRadius: 2,
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <ChatHeader />
      <ChatMessageList messages={messages} isTyping={isTyping} />

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          flexShrink: 0,
        }}
      >
        <Uploady {...uploadConfig}>
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={onSendMessage}
            isDisabled={isDisabled}
          />
        </Uploady>
      </Box>
    </Paper>
  );
};

export default Chat;
