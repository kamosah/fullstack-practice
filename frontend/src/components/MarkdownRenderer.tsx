import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import 'highlight.js/styles/github.css';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <Box className="markdown-body" sx={{ wordBreak: 'break-word', background: 'transparent' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          p: (props: React.ComponentProps<'p'>) => (
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              {props.children}
            </Typography>
          ),
          h1: (props: React.ComponentProps<'h1'>) => (
            <Typography variant="h4" sx={{ mb: 3, mt: 2, fontWeight: 700 }}>
              {props.children}
            </Typography>
          ),
          h2: (props: React.ComponentProps<'h2'>) => (
            <Typography variant="h5" sx={{ mb: 2.5, mt: 2, fontWeight: 600 }}>
              {props.children}
            </Typography>
          ),
          h3: (props: React.ComponentProps<'h3'>) => (
            <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 500 }}>
              {props.children}
            </Typography>
          ),
          code: (props: React.ComponentProps<'code'> & { inline?: boolean }) => {
            const { className, children, ...rest } = props;
            const isInline = !className;
            return isInline ? (
              <Box
                component="code"
                sx={{
                  fontSize: '0.95em',
                  px: 0.5,
                  py: 0.2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  fontFamily: 'Roboto Mono, monospace',
                }}
                {...rest}
              >
                {children}
              </Box>
            ) : (
              <Box
                component="pre"
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
                {...rest}
              >
                <code>{children}</code>
              </Box>
            );
          },
          a: (props: React.ComponentProps<'a'>) => (
            <MuiLink
              color="primary.main"
              href={props.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </MuiLink>
          ),
          ul: (props: React.ComponentProps<'ul'>) => (
            <List sx={{ mb: 2, pl: 3, listStyleType: 'disc' }}>{props.children}</List>
          ),
          ol: (props: React.ComponentProps<'ol'>) => (
            <List component="ol" sx={{ mb: 2, pl: 3, listStyleType: 'decimal' }}>
              {props.children}
            </List>
          ),
          li: (props: React.ComponentProps<'li'>) => (
            <ListItem sx={{ display: 'list-item', pl: 0 }}>{props.children}</ListItem>
          ),
        }}
      >
        {sanitizedMarkdown}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
