import React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TbTableFilled } from "react-icons/tb";
import { MessageType } from "../../types/chat";
import type { Message } from "../../types/chat";
import MarkdownRenderer from "../MarkdownRenderer";
import AttachmentList from "../AttachmentList";

const ChatMessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <Stack
    direction="row"
    alignItems="flex-start"
    spacing={2}
    className="message-enter"
  >
    <Avatar
      sx={{
        bgcolor:
          message.type === MessageType.USER ? "grey.400" : "primary.main",
        width: 40,
        height: 40,
        fontSize: 18,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {message.type === MessageType.USER ? "U" : <TbTableFilled size={22} />}
    </Avatar>
    <Box
      sx={{
        maxWidth: "70%",
        bgcolor:
          message.type === MessageType.USER ? "primary.main" : "transparent",
        color:
          message.type === MessageType.USER
            ? "primary.contrastText"
            : "text.primary",
        px: 2,
        py: 1.5,
        borderRadius: 2,
        borderBottomRightRadius: message.type === MessageType.USER ? 1 : 2,
        borderBottomLeftRadius: message.type === MessageType.AGENT ? 1 : 2,
        boxShadow: message.type === MessageType.USER ? 1 : 0,
      }}
    >
      {message.type === MessageType.AGENT ? (
        <MarkdownRenderer markdown={message.content} />
      ) : (
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.5, whiteSpace: "pre-line" }}
        >
          {message.content}
        </Typography>
      )}
      {message.attachments && (
        <AttachmentList attachments={message.attachments} />
      )}
    </Box>
  </Stack>
);

export default ChatMessageBubble;
