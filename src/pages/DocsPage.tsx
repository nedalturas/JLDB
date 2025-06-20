import { useState, useEffect } from 'react';
import { Grid, Container } from '@mantine/core';
import { DocsSidebar } from '../components/DocsSidebar';
import { DocsContent } from '../components/DocsContent';
import { useMarkdownDocs } from '../hooks/useMarkdownDocs';

function DocsPage() {
  const { articles, loading } = useMarkdownDocs();
  const [activeSection, setActiveSection] = useState('');

  // Set the first article as active when articles are loaded
  useEffect(() => {
    if (!loading && articles.length > 0 && !activeSection) {
      setActiveSection(articles[0].id);
    }
  }, [articles, loading, activeSection]);

  return (
    <Container size="xl" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <DocsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <DocsContent activeSection={activeSection} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default DocsPage;