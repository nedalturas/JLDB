import { Container, Title, Text, Paper, Stack, Code, List, Alert } from '@mantine/core';

interface DocsContentProps {
  activeSection: string;
}

export function DocsContent({ activeSection }: DocsContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <Stack gap="xl">
            <div>
              <Title order={1} mb="md">Getting Started</Title>
              <Text size="lg" c="dimmed">
                Welcome to JLDB! This guide will help you get started with our service provider database.
              </Text>
            </div>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">What is JLDB?</Title>
              <Text mb="md">
                JLDB is a comprehensive database for service providers across the UAE. Our platform connects customers with verified service providers in various categories including cleaning, plumbing, electrical work, and more.
              </Text>
              <Text>
                Use our intuitive search and filtering system to find the perfect service provider for your needs.
              </Text>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Quick Start</Title>
              <List spacing="md" size="sm">
                <List.Item>Navigate to the Database page from the main menu</List.Item>
                <List.Item>Use the city filter to narrow down providers by location</List.Item>
                <List.Item>Select a service type to find specialized providers</List.Item>
                <List.Item>Use the search bar to find specific company names</List.Item>
                <List.Item>Click "View" to see detailed information about a provider</List.Item>
                <List.Item>Click "Chat" to start a WhatsApp conversation</List.Item>
              </List>
            </Paper>
          </Stack>
        );

      case 'search-filters':
        return (
          <Stack gap="xl">
            <div>
              <Title order={1} mb="md">Search & Filters</Title>
              <Text size="lg" c="dimmed">
                Learn how to effectively use our search and filtering system to find the right service providers.
              </Text>
            </div>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">City Coverage Filter</Title>
              <Text mb="md">
                Filter results by specific cities across the UAE:
              </Text>
              <List spacing="sm" size="sm">
                <List.Item><strong>Dubai</strong> - The largest city with the most providers</List.Item>
                <List.Item><strong>Abu Dhabi</strong> - Capital city with premium services</List.Item>
                <List.Item><strong>Sharjah</strong> - Cultural capital with diverse providers</List.Item>
                <List.Item><strong>Ajman</strong> - Growing market with competitive rates</List.Item>
                <List.Item><strong>Al Ain</strong> - Garden city with specialized services</List.Item>
              </List>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Service Type Categories</Title>
              <Text mb="md">
                Browse by service categories to find specialized providers:
              </Text>
              <List spacing="sm" size="sm">
                <List.Item><strong>Cleaning Services</strong> - Home, office, and deep cleaning</List.Item>
                <List.Item><strong>Plumbing</strong> - Installation, repair, and maintenance</List.Item>
                <List.Item><strong>Electrical</strong> - Wiring, fixtures, and troubleshooting</List.Item>
                <List.Item><strong>HVAC</strong> - Air conditioning and heating services</List.Item>
                <List.Item><strong>Maintenance</strong> - General property maintenance</List.Item>
              </List>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Text Search Tips</Title>
              <List spacing="sm" size="sm">
                <List.Item>Search by company name for specific providers</List.Item>
                <List.Item>Use partial names - the search is case-insensitive</List.Item>
                <List.Item>Combine filters for more precise results</List.Item>
                <List.Item>Clear filters to see all available providers</List.Item>
              </List>
            </Paper>
          </Stack>
        );

      case 'provider-details':
        return (
          <Stack gap="xl">
            <div>
              <Title order={1} mb="md">Provider Details</Title>
              <Text size="lg" c="dimmed">
                Understanding provider information and how to connect with service providers.
              </Text>
            </div>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Provider Information</Title>
              <Text mb="md">
                Each provider listing includes the following information:
              </Text>
              <List spacing="sm" size="sm">
                <List.Item><strong>Company Name</strong> - Official business name</List.Item>
                <List.Item><strong>City Coverage</strong> - Areas where they provide services</List.Item>
                <List.Item><strong>Service Type</strong> - Categories of services offered</List.Item>
                <List.Item><strong>Status</strong> - Current availability (Active/Inactive)</List.Item>
                <List.Item><strong>Contact Options</strong> - WhatsApp and other communication methods</List.Item>
              </List>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Contacting Providers</Title>
              <Text mb="md">
                We offer multiple ways to connect with service providers:
              </Text>
              <Alert color="blue" title="WhatsApp Integration" mb="md">
                Click the "Chat" button to start a WhatsApp conversation directly with the provider. This is the fastest way to get quotes and schedule services.
              </Alert>
              <Text size="sm" c="dimmed">
                Note: Chat functionality is only available for providers who have enabled WhatsApp integration.
              </Text>
            </Paper>
          </Stack>
        );

      case 'api-reference':
        return (
          <Stack gap="xl">
            <div>
              <Title order={1} mb="md">API Reference</Title>
              <Text size="lg" c="dimmed">
                For developers looking to integrate with our platform programmatically.
              </Text>
            </div>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Base URL</Title>
              <Code block mb="md">https://api.jldb.com/v1</Code>
              <Text size="sm" c="dimmed">
                All API requests should be made to this base URL with the appropriate endpoint.
              </Text>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Authentication</Title>
              <Text mb="md">
                API requests require authentication using an API key:
              </Text>
              <Code block mb="md">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.jldb.com/v1/providers`}
              </Code>
              <Alert color="yellow" title="API Key Required">
                Contact our support team to obtain an API key for your application.
              </Alert>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Endpoints</Title>
              <Stack gap="md">
                <div>
                  <Code block mb="xs">GET /providers</Code>
                  <Text size="sm" c="dimmed">
                    Retrieve all providers with optional filtering parameters
                  </Text>
                  <Text size="xs" c="dimmed" mt="xs">
                    Query params: city, service, status, limit, offset
                  </Text>
                </div>
                <div>
                  <Code block mb="xs">GET /providers/:id</Code>
                  <Text size="sm" c="dimmed">
                    Get detailed information about a specific provider
                  </Text>
                </div>
                <div>
                  <Code block mb="xs">GET /cities</Code>
                  <Text size="sm" c="dimmed">
                    List all available cities with provider counts
                  </Text>
                </div>
                <div>
                  <Code block mb="xs">GET /services</Code>
                  <Text size="sm" c="dimmed">
                    List all service categories
                  </Text>
                </div>
              </Stack>
            </Paper>
          </Stack>
        );

      case 'troubleshooting':
        return (
          <Stack gap="xl">
            <div>
              <Title order={1} mb="md">Troubleshooting</Title>
              <Text size="lg" c="dimmed">
                Common issues and their solutions to help you get the most out of JLDB.
              </Text>
            </div>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Common Issues</Title>
              <Stack gap="lg">
                <div>
                  <Title order={3} size="h4" mb="xs">No results found</Title>
                  <Text size="sm" mb="xs">
                    If your search returns no results, try:
                  </Text>
                  <List spacing="xs" size="sm">
                    <List.Item>Clearing all filters and searching again</List.Item>
                    <List.Item>Using broader search terms</List.Item>
                    <List.Item>Checking if the service is available in your selected city</List.Item>
                    <List.Item>Trying alternative service categories</List.Item>
                  </List>
                </div>

                <div>
                  <Title order={3} size="h4" mb="xs">Chat button not working</Title>
                  <Text size="sm" mb="xs">
                    If the WhatsApp chat button is disabled:
                  </Text>
                  <List spacing="xs" size="sm">
                    <List.Item>The provider may not have WhatsApp integration enabled</List.Item>
                    <List.Item>Check if you have WhatsApp installed on your device</List.Item>
                    <List.Item>Try refreshing the page and clicking again</List.Item>
                  </List>
                </div>

                <div>
                  <Title order={3} size="h4" mb="xs">Slow loading times</Title>
                  <Text size="sm" mb="xs">
                    If the page loads slowly:
                  </Text>
                  <List spacing="xs" size="sm">
                    <List.Item>Check your internet connection</List.Item>
                    <List.Item>Clear your browser cache and cookies</List.Item>
                    <List.Item>Try using a different browser</List.Item>
                    <List.Item>Disable browser extensions temporarily</List.Item>
                  </List>
                </div>
              </Stack>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Browser Compatibility</Title>
              <Text mb="md">
                JLDB works best with modern browsers. Supported browsers include:
              </Text>
              <List spacing="xs" size="sm">
                <List.Item>Chrome 90+</List.Item>
                <List.Item>Firefox 88+</List.Item>
                <List.Item>Safari 14+</List.Item>
                <List.Item>Edge 90+</List.Item>
              </List>
            </Paper>
          </Stack>
        );

      case 'support':
        return (
          <Stack gap="xl">
            <div>
              <Title order={1} mb="md">Support & Contact</Title>
              <Text size="lg" c="dimmed">
                Get help when you need it. Our support team is here to assist you.
              </Text>
            </div>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Contact Information</Title>
              <Stack gap="md">
                <div>
                  <Text fw={500} mb="xs">Email Support</Text>
                  <Text size="sm" c="dimmed">support@jldb.com</Text>
                  <Text size="xs" c="dimmed">Response time: 24-48 hours</Text>
                </div>
                <div>
                  <Text fw={500} mb="xs">Phone Support</Text>
                  <Text size="sm" c="dimmed">+971 4 123 4567</Text>
                  <Text size="xs" c="dimmed">Available: Sunday - Thursday, 9 AM - 6 PM GST</Text>
                </div>
                <div>
                  <Text fw={500} mb="xs">Live Chat</Text>
                  <Text size="sm" c="dimmed">Available 24/7 on our platform</Text>
                  <Text size="xs" c="dimmed">Look for the chat widget in the bottom right corner</Text>
                </div>
              </Stack>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Business Inquiries</Title>
              <Text mb="md">
                For business partnerships, provider onboarding, or enterprise solutions:
              </Text>
              <Stack gap="xs">
                <Text size="sm">• Business Email: business@jldb.com</Text>
                <Text size="sm">• Partnership Inquiries: partnerships@jldb.com</Text>
                <Text size="sm">• Media & Press: media@jldb.com</Text>
              </Stack>
            </Paper>

            <Paper shadow="sm" p="xl" radius="md">
              <Title order={2} mb="md">Feedback</Title>
              <Text mb="md">
                We value your feedback and suggestions for improving JLDB:
              </Text>
              <Text size="sm">
                Send your feedback to: feedback@jldb.com
              </Text>
            </Paper>
          </Stack>
        );

      default:
        return (
          <div>
            <Title order={1} mb="md">Documentation</Title>
            <Text>Select a section from the sidebar to view documentation.</Text>
          </div>
        );
    }
  };

  return (
    <Container size="lg" py="xl">
      {renderContent()}
    </Container>
  );
}