import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';

export const MarkdownRoot = styled(Box)({
  wordBreak: 'break-word',
  background: 'transparent',
});

export const InlineCode = forwardRef<HTMLElement, React.ComponentProps<'code'>>(
  ({ children, ...restInline }, ref) => (
    <Typography
      component="code"
      ref={ref}
      sx={{
        fontSize: '0.95em',
        px: 0.5,
        py: 0.2,
        bgcolor: 'grey.100',
        borderRadius: 1,
        fontFamily: 'Roboto Mono, monospace',
      }}
      {...restInline}
    >
      {children}
    </Typography>
  ),
);

export const CodeBlock = forwardRef<HTMLPreElement, React.ComponentProps<'pre'>>(
  ({ className, children, ...restBlock }, ref) => (
    <Typography
      component="pre"
      ref={ref}
      sx={{
        display: 'block',
        whiteSpace: 'pre',
        p: 2,
        borderRadius: 2,
        bgcolor: 'grey.100',
        fontFamily: 'Roboto Mono, monospace',
        overflowX: 'auto',
        mb: 2,
      }}
      className={className}
      {...restBlock}
    >
      <code>{children}</code>
    </Typography>
  ),
);
