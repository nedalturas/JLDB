import { Container, Title, Text, Alert, Loader, Stack } from '@mantine/core';
import { useMarkdownDocs, DocArticle } from '../hooks/useMarkdownDocs';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DocsContentProps {
  activeSection: string;
}

export function DocsContent({ activeSection }: DocsContentProps) {
  const { articles, loading, error } = useMarkdownDocs();

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading documentation...</Text>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Error loading documentation">
          {error}
        </Alert>
      </Container>
    );
  }

  const currentArticle = articles.find(article => article.id === activeSection);

  if (!currentArticle) {
    return (
      <Container size="lg" py="xl">
        <Alert color="yellow" title="Article not found">
          The requested documentation article could not be found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <MarkdownRenderer content={currentArticle.content} />
    </Container>
  );
}