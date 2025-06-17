import { Container, Title, Text, Paper, Stack, Code, Divider } from '@mantine/core';

function DocsPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Documentation</Title>
          <Text size="lg" c="dimmed">
            Welcome to the JLDB documentation. Here you'll find everything you need to know about using our platform.
          </Text>
        </div>

        <Paper shadow="sm" p="xl" radius="md">
          <Title order={2} mb="md">Getting Started</Title>
          <Text mb="md">
            JLDB is a comprehensive database for service providers across the UAE. Use the filters on the main page to search for specific services and locations.
          </Text>
          <Text>
            Click on any service provider to view their details or start a chat conversation.
          </Text>
        </Paper>

        <Paper shadow="sm" p="xl" radius="md">
          <Title order={2} mb="md">Search Functionality</Title>
          <Stack gap="md">
            <div>
              <Text fw={500} mb="xs">City Coverage</Text>
              <Text size="sm" c="dimmed">
                Filter results by specific cities including Dubai, Abu Dhabi, and Sharjah.
              </Text>
            </div>
            <div>
              <Text fw={500} mb="xs">Service Type</Text>
              <Text size="sm" c="dimmed">
                Browse by service categories such as Cleaning, Plumbing, and Electrical services.
              </Text>
            </div>
            <div>
              <Text fw={500} mb="xs">Text Search</Text>
              <Text size="sm" c="dimmed">
                Use the search field to find specific providers by name or keywords.
              </Text>
            </div>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="xl" radius="md">
          <Title order={2} mb="md">API Reference</Title>
          <Text mb="md">
            For developers looking to integrate with our platform, here are some example API endpoints:
          </Text>
          <Stack gap="sm">
            <div>
              <Code block>GET /api/providers?city=dubai&service=cleaning</Code>
              <Text size="sm" c="dimmed" mt="xs">
                Retrieve providers filtered by city and service type
              </Text>
            </div>
            <div>
              <Code block>GET /api/providers/:id</Code>
              <Text size="sm" c="dimmed" mt="xs">
                Get detailed information about a specific provider
              </Text>
            </div>
            <div>
              <Code block>POST /api/chat/initiate</Code>
              <Text size="sm" c="dimmed" mt="xs">
                Start a chat session with a service provider
              </Text>
            </div>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="xl" radius="md">
          <Title order={2} mb="md">Support</Title>
          <Text mb="md">
            Need help? Here are some ways to get support:
          </Text>
          <Stack gap="xs">
            <Text size="sm">• Email: support@jldb.com</Text>
            <Text size="sm">• Phone: +971 4 123 4567</Text>
            <Text size="sm">• Live Chat: Available 24/7 on our platform</Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default DocsPage;