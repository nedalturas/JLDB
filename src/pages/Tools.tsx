import { useState } from 'react';
import { Grid, Container } from '@mantine/core';
import { ToolsSidebar } from '../components/ToolsSidebar';
import { ToolsContent } from '../components/ToolsContent';

function Tools() {
  const [activeSection, setActiveSection] = useState('');

  return (
    <Container size="xl" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <ToolsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <ToolsContent activeSection={activeSection} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Tools;