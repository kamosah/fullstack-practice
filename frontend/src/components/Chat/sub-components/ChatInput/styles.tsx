import { Box, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';

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

export const ChatInputTextarea = styled(TextareaAutosize)<{ disabled?: boolean }>(
  ({ disabled }) => ({
    background: 'transparent',
    border: 'none',
    color: disabled ? '#aaa' : 'inherit',
    fontSize: 16,
    outline: 'none',
    padding: '0 1rem',
    resize: 'none',
    width: '100%',
  }),
);
