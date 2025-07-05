import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import {
  Box,
  Text,
  Code,
  Heading,
  Link,
  ListItem,
  List,
} from "@chakra-ui/react";
import "highlight.js/styles/github.css"; // Import a highlight.js theme (adjust as needed)

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  // Sanitize the Markdown content
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <Box
      className="markdown-body"
      wordBreak="break-word"
      background="transparent"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Map Markdown elements to Chakra UI components
          p: ({ children }) => <Text mb={2}>{children}</Text>,
          h1: ({ children }) => (
            <Heading as="h1" size="xl" mb={4}>
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" size="lg" mb={3}>
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading as="h3" size="md" mb={2}>
              {children}
            </Heading>
          ),
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className;
            return isInline ? (
              <Code fontSize="sm" px={1} {...props}>
                {children}
              </Code>
            ) : (
              <Code
                display="block"
                whiteSpace="pre"
                p={2}
                borderRadius="md"
                className={className}
                {...props}
              >
                {children}
              </Code>
            );
          },
          a: ({ href, children }) => (
            <Link color="blue.500" href={href}>
              {children}
            </Link>
          ),
          ul: ({ children }) => <List.Root mb={2}>{children}</List.Root>,
          ol: ({ children }) => (
            <List.Root as="ol" mb={2}>
              {children}
            </List.Root>
          ),
          li: ({ children }) => <ListItem>{children}</ListItem>,
        }}
      >
        {sanitizedMarkdown}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
