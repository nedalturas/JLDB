import { useState } from 'react';
import { Grid, Container } from '@mantine/core';
import { DocsSidebar, DocSection } from '../components/DocsSidebar';
import { DocsContent } from '../components/DocsContent';

const docSections: DocSection[] = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'search-filters', title: 'Search & Filters' },
  { id: 'provider-details', title: 'Provider Details' },
  { id: 'api-reference', title: 'API Reference' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
  { id: 'support', title: 'Support & Contact' },
];

function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <Container size="xl" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <DocsSidebar
            sections={docSections}
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