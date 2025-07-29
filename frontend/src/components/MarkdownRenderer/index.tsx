import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import 'highlight.js/styles/github.css';
import { InlineCode } from './InlineCode';
import { MarkdownRoot } from './styles';

export interface MarkdownRendererProps {
  markdown: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const sanitizedMarkdown = DOMPurify.sanitize(markdown);

  return (
    <MarkdownRoot className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          p: (props) => (
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              {props.children}
            </Typography>
          ),
          h1: (props) => (
            <Typography variant="h4" sx={{ mb: 3, mt: 2, fontWeight: 700 }}>
              {props.children}
            </Typography>
          ),
          h2: (props) => (
            <Typography variant="h5" sx={{ mb: 2.5, mt: 2, fontWeight: 600 }}>
              {props.children}
            </Typography>
          ),
          h3: (props) => (
            <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 500 }}>
              {props.children}
            </Typography>
          ),
          code: ({
            node, // eslint-disable-line @typescript-eslint/no-unused-vars
            className,
            children,
            ...props
          }) => {
            const match = /language-(\w+)/.exec(className || '');
            const flattenChildren = (child: React.ReactNode): string => {
              if (typeof child === 'string') return child;
              if (typeof child === 'number') return child.toString();
              if (
                React.isValidElement(child) &&
                'props' in child &&
                typeof child.props === 'object' &&
                child.props !== null
              ) {
                return flattenChildren((child.props as { children?: React.ReactNode }).children);
              }
              if (Array.isArray(child)) {
                return child.map(flattenChildren).join('');
              }
              return '';
            };
            const codeString = React.Children.toArray(children).map(flattenChildren).join('');

            return match ? (
              <SyntaxHighlighter
                // @ts-expect-error nightOwl is a PrismStyle
                style={nightOwl}
                language={match[1]}
                PreTag="div"
                customStyle={{ borderRadius: '4px' }}
                {...props}
              >
                {codeString.replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <InlineCode {...props}>{children}</InlineCode>
            );
          },
          a: (props) => (
            <MuiLink
              color="primary.main"
              href={props.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </MuiLink>
          ),
          ul: (props) => <List sx={{ mb: 2, pl: 3, listStyleType: 'disc' }}>{props.children}</List>,
          ol: (props) => (
            <List component="ol" sx={{ mb: 2, pl: 3, listStyleType: 'decimal' }}>
              {props.children}
            </List>
          ),
          li: (props) => <ListItem sx={{ display: 'list-item', pl: 0 }}>{props.children}</ListItem>,
        }}
      >
        {sanitizedMarkdown}
      </ReactMarkdown>
    </MarkdownRoot>
  );
};

export default MarkdownRenderer;
