import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextareaAutosize, { type TextareaAutosizeProps } from '@mui/material/TextareaAutosize';

export const MessageListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  height: '100%',
  overflowY: 'auto',
  padding: theme.spacing(2),
  position: 'relative',
  width: '100%',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#c1c1c1',
    borderRadius: '3px',
  },
}));

export const ToolbarRoot = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderRadius: '100%',
  boxShadow: 'none',
  display: 'flex',
  fontSize: '1.25rem',
  gap: theme.spacing(1),
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  width: '100%',
}));

export const ToolbarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const ChatInputRoot = styled(Box)({
  backgroundColor: 'transparent',
  borderRadius: '1.5rem',
  flexShrink: 0,
  width: '100%',
});

export const ChatInputContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '1.5rem',
  display: 'flex',
  flex: 1,
  gap: theme.spacing(2),
  minWidth: 0,
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(0.75),
  paddingRight: theme.spacing(0.75),
  paddingTop: theme.spacing(2.5),
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
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  width: '100%',
});

interface StyledTextareaProps extends TextareaAutosizeProps {
  disabled?: boolean;
}

export const StyledTextarea = styled(TextareaAutosize)<StyledTextareaProps>(({ disabled }) => ({
  background: 'transparent',
  border: 'none',
  color: disabled ? '#aaa' : 'inherit',
  fontSize: 16,
  outline: 'none',
  padding: '0 1rem',
  resize: 'none',
  width: '100%',
}));

export const MessageBubbleBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{
  isUser: boolean;
}>(({ theme, isUser }) => ({
  backgroundColor: isUser ? theme.palette.grey[50] : 'transparent',
  borderRadius: 24,
  boxShadow: isUser ? theme.shadows[1] : 'none',
  color: isUser ? theme.palette.grey[900] : theme.palette.text.primary,
  justifyContent: 'flex-end',
  maxWidth: '70%',
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));
