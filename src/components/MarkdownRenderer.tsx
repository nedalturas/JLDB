import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Paper, Code, Title, Text, List, Table, Blockquote, Divider, useMantineColorScheme, Image } from '@mantine/core';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Responsive Image Component
  const ResponsiveImage = ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt || ''}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  };

  return (
    <div style={{ 
      color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)',
    }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Headings
          h1: ({ children }) => (
            <Title order={1} mb="lg" mt="xl" style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)' 
            }}>
              {children}
            </Title>
          ),
          h2: ({ children }) => (
            <Title order={2} mb="md" mt="xl" style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)' 
            }}>
              {children}
            </Title>
          ),
          h3: ({ children }) => (
            <Title order={3} mb="sm" mt="lg" style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)' 
            }}>
              {children}
            </Title>
          ),
          h4: ({ children }) => (
            <Title order={4} mb="sm" mt="md" style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)' 
            }}>
              {children}
            </Title>
          ),
          h5: ({ children }) => (
            <Title order={5} mb="xs" mt="md" style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)' 
            }}>
              {children}
            </Title>
          ),
          h6: ({ children }) => (
            <Title order={6} mb="xs" mt="md" style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)' 
            }}>
              {children}
            </Title>
          ),

          // Paragraphs
          p: ({ children }) => (
            <Text mb="md" style={{ 
              lineHeight: 1.6,
              color: isDark ? 'var(--mantine-color-dark-1)' : 'var(--mantine-color-gray-7)'
            }}>
              {children}
            </Text>
          ),

          // Code blocks
          pre: ({ children }) => (
            <Paper 
              p="md" 
              mb="md" 
              style={{ 
                backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : '#f8f9fa',
                overflow: 'auto',
                border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
              }}
            >
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
              <Code 
                style={{ 
                  fontSize: '0.9em', 
                  padding: '2px 6px',
                  backgroundColor: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-1)',
                  color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)',
                }}
              >
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
            <List.Item style={{ 
              color: isDark ? 'var(--mantine-color-dark-1)' : 'var(--mantine-color-gray-7)'
            }}>
              {children}
            </List.Item>
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
          th: ({ children }) => (
            <Table.Th style={{ 
              backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)',
            }}>
              {children}
            </Table.Th>
          ),
          td: ({ children }) => (
            <Table.Td style={{ 
              color: isDark ? 'var(--mantine-color-dark-1)' : 'var(--mantine-color-gray-7)'
            }}>
              {children}
            </Table.Td>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <Blockquote 
              mb="md" 
              style={{ 
                borderLeftColor: 'var(--mantine-color-primary-6)',
                backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                color: isDark ? 'var(--mantine-color-dark-1)' : 'var(--mantine-color-gray-7)',
              }}
            >
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
              style={{ 
                color: 'var(--mantine-color-primary-6)', 
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.color = 'var(--mantine-color-primary-7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
                e.currentTarget.style.color = 'var(--mantine-color-primary-6)';
              }}
            >
              {children}
            </Text>
          ),

          // Images
          img: ({ src, alt }) => <ResponsiveImage src={src} alt={alt} />,

          // Strong/Bold
          strong: ({ children }) => (
            <Text component="strong" fw={600} style={{ 
              color: isDark ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-gray-9)'
            }}>
              {children}
            </Text>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <Text component="em" fs="italic" style={{ 
              color: isDark ? 'var(--mantine-color-dark-1)' : 'var(--mantine-color-gray-7)'
            }}>
              {children}
            </Text>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}