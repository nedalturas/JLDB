import { useState, useEffect } from 'react';
import { Table, ScrollArea, Group, Text, Container, Button, Modal, Badge, Loader, Alert } from '@mantine/core';

interface SheetData {
  'Company name': string;
  'City Coverage': string;
  'Service Type': string;
  [key: string]: any; // For any additional columns
}

function ResultsTable() {
  const [opened, setOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SheetData | null>(null);
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SHEET_ID = '1aAOwWOLyUdbT2a3F4IBTHDPnXBlBH240OFtIKom5H9Q';
  const SHEET_NAME = 'Sheet1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://opensheet.vercel.app/${SHEET_ID}/${SHEET_NAME}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const sheetData = await response.json();
        setData(sheetData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleView = (row: SheetData) => {
    setSelectedRow(row);
    setOpened(true);
  };

  const handleChat = (row: SheetData) => {
    // Placeholder for chat functionality
    console.log('Starting chat with:', row['Company name']);
    // You can implement actual chat functionality here
  };

  if (loading) {
    return (
      <Container>
        <Group justify="center" p="xl">
          <Loader size="lg" />
          <Text>Loading data...</Text>
        </Group>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert color="red" title="Error loading data">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container>
        <Alert color="yellow" title="No data available">
          No records found in the sheet.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Company Details"
          centered
          size="md"
        >
          {selectedRow ? (
            <div>
              <Text mb="sm"><strong>Company Name:</strong> {selectedRow['Company Name']}</Text>
              <Text mb="sm"><strong>City Coverage:</strong> {selectedRow['City Coverage']}</Text>
              <Text mb="sm"><strong>Service Type:</strong> {selectedRow['Service Type']}</Text>
              
              {/* Display any additional fields from the sheet */}
              {Object.entries(selectedRow).map(([key, value]) => {
                if (!['Company Name', 'City Coverage', 'Service Type'].includes(key)) {
                  return (
                    <Text key={key} mb="sm">
                      <strong>{key}:</strong> {value}
                    </Text>
                  );
                }
                return null;
              })}
            </div>
          ) : null}
        </Modal>

        <ScrollArea>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Company Name</Table.Th>
                <Table.Th>City Coverage</Table.Th>
                <Table.Th>Service Type</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((row, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>{row['Company name'] || 'N/A'}</Table.Td>
                  <Table.Td>{row['City Coverage'] || 'N/A'}</Table.Td>
                  <Table.Td>{row['Service Type'] || 'N/A'}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button size="xs" onClick={() => handleView(row)}>
                        View
                      </Button>
                      <Button 
                        size="xs" 
                        variant="outline" 
                        color="blue"
                        onClick={() => handleChat(row)}
                      >
                        Chat
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Container>
    </>
  );
}

export default ResultsTable;