import { useState, useEffect } from 'react';
import { Table, ScrollArea, Group, Text, Container, Button, Modal, Badge, Loader, Alert } from '@mantine/core';

interface SheetData {
  'Company Name': string;
  'Dubai': string;
  'Abu Dhabi': string;
  'Sharjah': string;
  'Ajman': string;
  'Al Ain': string;
  'Service Type': string;
  'Status': string;
  'Whatsapp': string;
  [key: string]: any;
}

interface FilteredData {
  companyName: string;
  citysCoverage: string[];
  serviceType: string;
  status: string;
  whatsapp: string;
}

interface ResultsTableProps {
  filters?: {
    city: string;
    service: string;
    search: string;
  };
  onDataLoad?: (data: SheetData[]) => void;
}

function ResultsTable({ filters, onDataLoad }: ResultsTableProps) {
  const [opened, setOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FilteredData | null>(null);
  const [data, setData] = useState<SheetData[]>([]);
  const [filteredData, setFilteredData] = useState<FilteredData[]>([]);
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
        
        // Pass data to parent component for filter options
        if (onDataLoad) {
          onDataLoad(sheetData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onDataLoad]);

  // Process and filter data
  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    const processedData: FilteredData[] = data.map(row => {
      // Get cities where the company operates (where checkbox is checked)
      const cities = [];
      if (row['Dubai'] === 'TRUE' || row['Dubai'] === true) cities.push('Dubai');
      if (row['Abu Dhabi'] === 'TRUE' || row['Abu Dhabi'] === true) cities.push('Abu Dhabi');
      if (row['Sharjah'] === 'TRUE' || row['Sharjah'] === true) cities.push('Sharjah');
      if (row['Ajman'] === 'TRUE' || row['Ajman'] === true) cities.push('Ajman');
      if (row['Al Ain'] === 'TRUE' || row['Al Ain'] === true) cities.push('Al Ain');

      return {
        companyName: row['Company Name'] || 'N/A',
        citysCoverage: cities,
        serviceType: row['Service Type'] || 'N/A',
        status: row['Status'] || 'Active',
        whatsapp: row['Whatsapp'] || ''
      };
    });

    // Apply filters
    let filtered = processedData;

    if (filters) {
      if (filters.city) {
        filtered = filtered.filter(item => 
          item.citysCoverage.some(city => 
            city.toLowerCase().includes(filters.city.toLowerCase())
          )
        );
      }

      if (filters.service) {
        filtered = filtered.filter(item => 
          item.serviceType.toLowerCase().includes(filters.service.toLowerCase())
        );
      }

      if (filters.search) {
        filtered = filtered.filter(item => 
          item.companyName.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
    }

    setFilteredData(filtered);
  }, [data, filters]);

  const handleView = (row: FilteredData) => {
    setSelectedRow(row);
    setOpened(true);
  };

  const handleChat = (row: FilteredData) => {
    if (row.whatsapp) {
      // Open WhatsApp chat
      window.open(row.whatsapp, '_blank');
    } else {
      console.log('No WhatsApp link available for:', row.companyName);
    }
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

  if (!filteredData || filteredData.length === 0) {
    return (
      <Container>
        <Alert color="yellow" title="No data available">
          {filters && (filters.city || filters.service || filters.search) 
            ? 'No records match your current filters.' 
            : 'No records found in the sheet.'}
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
              <Text mb="sm"><strong>Company Name:</strong> {selectedRow.companyName}</Text>
              <Text mb="sm"><strong>City Coverage:</strong> {selectedRow.citysCoverage.join(', ')}</Text>
              <Text mb="sm"><strong>Service Type:</strong> {selectedRow.serviceType}</Text>
              <Text mb="sm">
                <strong>Status:</strong>{' '}
                <Badge 
                  variant="light" 
                  color={selectedRow.status.toLowerCase() === 'active' ? 'green' : 'red'}
                >
                  {selectedRow.status}
                </Badge>
              </Text>
              {selectedRow.whatsapp && (
                <Text mb="sm"><strong>WhatsApp:</strong> Available</Text>
              )}
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
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredData.map((row, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>{row.companyName}</Table.Td>
                  <Table.Td>{row.citysCoverage.join(', ') || 'N/A'}</Table.Td>
                  <Table.Td>{row.serviceType}</Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="light" 
                      color={row.status.toLowerCase() === 'active' ? 'green' : 'red'}
                    >
                      {row.status}
                    </Badge>
                  </Table.Td>
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
                        disabled={!row.whatsapp}
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