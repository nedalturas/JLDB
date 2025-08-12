import { Container, Text, Alert, Stack, Title, Card, Group, Badge } from '@mantine/core';
import { IconTool, IconCalculator, IconQrcode, IconLink, IconFileText, IconMarkdown, IconColorPicker, IconPhoto } from '@tabler/icons-react';

interface ToolsContentProps {
  activeSection: string;
}

const toolIcons: Record<string, React.ReactNode> = {
  calculator: <IconCalculator size={24} />,
  converter: <IconCalculator size={24} />,
  'qr-generator': <IconQrcode size={24} />,
  'link-shortener': <IconLink size={24} />,
  'text-formatter': <IconFileText size={24} />,
  'markdown-preview': <IconMarkdown size={24} />,
  'color-picker': <IconColorPicker size={24} />,
  'image-optimizer': <IconPhoto size={24} />
};

const toolContent: Record<string, { title: string; description: string; content: React.ReactNode }> = {
  calculator: {
    title: 'Service Calculator',
    description: 'Calculate service costs and estimates',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Service calculator tool coming soon. This will help you calculate costs for various services.</Text>
      </Card>
    )
  },
  converter: {
    title: 'Unit Converter',
    description: 'Convert between different units',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Unit converter tool coming soon. Convert between different measurement units.</Text>
      </Card>
    )
  },
  'qr-generator': {
    title: 'QR Code Generator',
    description: 'Generate QR codes for WhatsApp links',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>QR code generator coming soon. Create QR codes for WhatsApp group links and other URLs.</Text>
      </Card>
    )
  },
  'link-shortener': {
    title: 'Link Shortener',
    description: 'Shorten long URLs',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Link shortener tool coming soon. Create short, manageable URLs from long links.</Text>
      </Card>
    )
  },
  'text-formatter': {
    title: 'Text Formatter',
    description: 'Format and clean text content',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Text formatter tool coming soon. Clean, format, and transform text content.</Text>
      </Card>
    )
  },
  'markdown-preview': {
    title: 'Markdown Preview',
    description: 'Preview markdown content',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Markdown preview tool coming soon. Preview and edit markdown content in real-time.</Text>
      </Card>
    )
  },
  'color-picker': {
    title: 'Color Picker',
    description: 'Pick and convert colors',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Color picker tool coming soon. Pick colors and convert between different color formats.</Text>
      </Card>
    )
  },
  'image-optimizer': {
    title: 'Image Optimizer',
    description: 'Optimize images for web',
    content: (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>Image optimizer tool coming soon. Compress and optimize images for web use.</Text>
      </Card>
    )
  }
};

export function ToolsContent({ activeSection }: ToolsContentProps) {
  if (!activeSection) {
    return (
      <Container size="lg" py="xl">
        <Stack gap="xl" align="center">
          <Group gap="md">
            <IconTool size={32} color="var(--mantine-color-primary-6)" />
            <Title order={2}>Welcome to Tools</Title>
          </Group>
          <Text size="lg" ta="center" c="dimmed">
            Select a tool from the sidebar to get started. These tools are designed to help you with various tasks and calculations.
          </Text>
          <Badge size="lg" variant="light" color="blue">
            More tools coming soon!
          </Badge>
        </Stack>
      </Container>
    );
  }

  const currentTool = toolContent[activeSection];

  if (!currentTool) {
    return (
      <Container size="lg" py="xl">
        <Alert color="yellow" title="Tool not found">
          The requested tool could not be found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group gap="md">
          {toolIcons[activeSection]}
          <div>
            <Title order={2}>{currentTool.title}</Title>
            <Text c="dimmed">{currentTool.description}</Text>
          </div>
        </Group>
        
        {currentTool.content}
      </Stack>
    </Container>
  );
}