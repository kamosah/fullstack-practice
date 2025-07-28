import { Box, TextareaAutosize } from '@mui/material';
import { styled, type CSSProperties } from '@mui/material/styles';

import { Layout } from '../../../../styles/layout';

const HomeChatInputStyles: CSSProperties = {
  width: '100%',
};

const ConversationChatInputStyles: CSSProperties = {
  position: 'fixed',
  // start near sidebar's end + 50% (approx center)
  left: `calc(${Layout.sidebarWidth}px + 50%)`,
  // translateX adjusts to truly center within main content
  transform: `translateX(calc(-50% - ${Layout.sidebarWidth / 2}px))`,
};

const getChatInputStyles = (isNewChat: boolean) => {
  return isNewChat ? HomeChatInputStyles : ConversationChatInputStyles;
};

export const ChatInputRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isNewChat',
})<{ isNewChat: boolean }>(({ theme, isNewChat }) => ({
  backgroundColor: theme.palette.background.default,
  bottom: 0,
  paddingBottom: theme.spacing(3),
  maxWidth: 'min(900px, 100vw)',
  ...getChatInputStyles(isNewChat),
}));

export const ChatInputContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '1rem',
  display: 'flex',
  flex: 1,
  gap: theme.spacing(2),
  minWidth: 0,
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(1.5),
  width: '100%',
  '&:hover': {
    borderColor: theme.palette.grey[300],
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: '0 0 0 1px',
  },
}));

export const ChatInputForm = styled(Box)({
  alignItems: 'stretch',
  background: 'transparent',
  border: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  width: '100%',
});

export const ChatInputTextarea = styled(TextareaAutosize)<{ disabled?: boolean }>(
  ({ disabled }) => ({
    background: 'transparent',
    border: 0,
    color: disabled ? '#aaa' : 'inherit',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    outline: 'none',
    padding: '0 1rem',
    resize: 'none',
    width: '100%',
  }),
);
