import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Paper, Code, Title, Text, List, Table, Blockquote, Divider } from '@mantine/core';
import 'highlight.js/styles/github.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={{
        // Headings
        h1: ({ children }) => (
          <Title order={1} mb="lg" mt="xl">
            {children}
          </Title>
        ),
        h2: ({ children }) => (
          <Title order={2} mb="md" mt="xl">
            {children}
          </Title>
        ),
        h3: ({ children }) => (
          <Title order={3} mb="sm" mt="lg">
            {children}
          </Title>
        ),
        h4: ({ children }) => (
          <Title order={4} mb="sm" mt="md">
            {children}
          </Title>
        ),
        h5: ({ children }) => (
          <Title order={5} mb="xs" mt="md">
            {children}
          </Title>
        ),
        h6: ({ children }) => (
          <Title order={6} mb="xs" mt="md">
            {children}
          </Title>
        ),

        // Paragraphs
        p: ({ children }) => (
          <Text mb="md" style={{ lineHeight: 1.6 }}>
            {children}
          </Text>
        ),

        // Code blocks
        pre: ({ children }) => (
          <Paper p="md" mb="md" style={{ backgroundColor: '#f8f9fa', overflow: 'auto' }}>
            {children}
          </Paper>
        ),

        // Inline code
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-');
          if (isBlock) {
            return <code className={className}>{children}</code>;
          }
          return (
            <Code style={{ fontSize: '0.9em', padding: '2px 6px' }}>
              {children}
            </Code>
          );
        },

        // Lists
        ul: ({ children }) => (
          <List mb="md" spacing="xs">
            {children}
          </List>
        ),
        ol: ({ children }) => (
          <List mb="md" spacing="xs" type="ordered">
            {children}
          </List>
        ),
        li: ({ children }) => (
          <List.Item>{children}</List.Item>
        ),

        // Tables
        table: ({ children }) => (
          <Paper mb="md" style={{ overflow: 'auto' }}>
            <Table striped highlightOnHover withTableBorder>
              {children}
            </Table>
          </Paper>
        ),
        thead: ({ children }) => <Table.Thead>{children}</Table.Thead>,
        tbody: ({ children }) => <Table.Tbody>{children}</Table.Tbody>,
        tr: ({ children }) => <Table.Tr>{children}</Table.Tr>,
        th: ({ children }) => <Table.Th>{children}</Table.Th>,
        td: ({ children }) => <Table.Td>{children}</Table.Td>,

        // Blockquotes
        blockquote: ({ children }) => (
          <Blockquote mb="md" style={{ borderLeftColor: '#228be6' }}>
            {children}
          </Blockquote>
        ),

        // Horizontal rule
        hr: () => <Divider my="xl" />,

        // Links
        a: ({ href, children }) => (
          <Text
            component="a"
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ color: '#228be6', textDecoration: 'none' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            {children}
          </Text>
        ),

        // Strong/Bold
        strong: ({ children }) => (
          <Text component="strong" fw={600}>
            {children}
          </Text>
        ),

        // Emphasis/Italic
        em: ({ children }) => (
          <Text component="em" fs="italic">
            {children}
          </Text>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}