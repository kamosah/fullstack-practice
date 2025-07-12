import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import type { Message, Attachment } from "../../types/chat";
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

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={onSendMessage}
        isDisabled={isDisabled}
      />
    </Paper>
  );
};

export default Chat;
