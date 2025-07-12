import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "highlight.js/styles/github.css";

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  // Sanitize the Markdown content
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <Box
      className="markdown-body"
      sx={{ wordBreak: "break-word", background: "transparent" }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          p: ({ children }) => (
            <Typography variant="body2" paragraph sx={{ mb: 2 }}>
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography variant="h4" sx={{ mb: 3, mt: 2, fontWeight: 700 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" sx={{ mb: 2.5, mt: 2, fontWeight: 600 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 500 }}>
              {children}
            </Typography>
          ),
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className;
            return isInline ? (
              <Box
                component="code"
                sx={{
                  fontSize: "0.95em",
                  px: 0.5,
                  py: 0.2,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                  fontFamily: "Roboto Mono, monospace",
                }}
                {...props}
              >
                {children}
              </Box>
            ) : (
              <Box
                component="pre"
                sx={{
                  display: "block",
                  whiteSpace: "pre",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "grey.100",
                  fontFamily: "Roboto Mono, monospace",
                  overflowX: "auto",
                  mb: 2,
                }}
                className={className}
                {...props}
              >
                <code>{children}</code>
              </Box>
            );
          },
          a: ({ href, children }) => (
            <MuiLink
              color="primary.main"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </MuiLink>
          ),
          ul: ({ children }) => (
            <List sx={{ mb: 2, pl: 3, listStyleType: "disc" }}>{children}</List>
          ),
          ol: ({ children }) => (
            <List
              component="ol"
              sx={{ mb: 2, pl: 3, listStyleType: "decimal" }}
            >
              {children}
            </List>
          ),
          li: ({ children }) => (
            <ListItem sx={{ display: "list-item", pl: 0 }}>{children}</ListItem>
          ),
        }}
      >
        {sanitizedMarkdown}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
