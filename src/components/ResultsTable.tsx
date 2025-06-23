import { useState, useEffect } from 'react';
import {
  Table,
  ScrollArea,
  Group,
  Text,
  Container,
  Button,
  Modal,
  Badge,
  Loader,
  Alert,
  Pagination,
  Select,
} from '@mantine/core';
import cx from 'clsx';
import classes from './ResultsTable.module.css';
import { IconEye, IconBrandWhatsapp } from '@tabler/icons-react';

interface SheetData {
  'Company Name': string;
  Dubai: string | boolean;
  'Abu Dhabi': string | boolean;
  Sharjah: string | boolean;
  Ajman: string | boolean;
  'Al Ain': string | boolean;
  'Service Type': string;
  Status: string;
  Whatsapp: string;
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

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    const processedData: FilteredData[] = data.map((row) => {
      const cityNames: (keyof Pick<SheetData, 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ajman' | 'Al Ain'>)[] = 
        ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'];
      
      const cities = cityNames.filter(city => 
        row[city] === 'TRUE' || row[city] === true
      );
    
      return {
        companyName: row['Company Name'] || 'N/A',
        citysCoverage: cities,
        serviceType: row['Service Type'] || 'N/A',
        status: row['Status'] || 'Active',
        whatsapp: row['Whatsapp'] || '',
      };
    });

    let filtered = processedData;

    if (filters) {
      if (filters.city) {
        filtered = filtered.filter((item) =>
          item.citysCoverage.some((city) => {
            const normalizedFilterCity = filters.city.toLowerCase().replace(/-/g, ' ');
            const normalizedCity = city.toLowerCase();
            return normalizedCity.includes(normalizedFilterCity);
          })
        );
      }

      if (filters.service) {
        filtered = filtered.filter((item) =>
          item.serviceType.toLowerCase().includes(filters.service.toLowerCase())
        );
      }

      if (filters.search) {
        filtered = filtered.filter((item) =>
          item.companyName.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
    }

    setFilteredData(filtered);
    setCurrentPage(1); // reset to first page when filter changes
  }, [data, filters]);

  const handleView = (row: FilteredData) => {
    setSelectedRow(row);
    setOpened(true);
  };

  const handleChat = (row: FilteredData) => {
    if (row.whatsapp) {
      window.open(row.whatsapp, '_blank');
    } else {
      console.log('No WhatsApp link available for:', row.companyName);
    }
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Container>
        <Group justify="center" align='center' p="xl">
          <Loader size="lg" />
          <Text>Loading data...</Text>
        </Group>
      </Container >
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
          {selectedRow && (
            <div>
              <Text mb="sm">
                <strong>Company Name:</strong> {selectedRow.companyName}
              </Text>
              <Text mb="sm">
                <strong>City Coverage:</strong> {selectedRow.citysCoverage.join(', ')}
              </Text>
              <Text mb="sm">
                <strong>Service Type:</strong> {selectedRow.serviceType}
              </Text>
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
                <Text mb="sm">
                  <strong>WhatsApp:</strong> Available
                </Text>
              )}
            </div>
          )}
        </Modal>

        <Group justify="space-between" mb="md">
          <Select
            label="Rows per page"
            data={['5', '10', '25', '50', '100']}
            value={rowsPerPage.toString()}
            onChange={(value) => setRowsPerPage(Number(value))}
            w={150}
          />
        </Group>

        <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
          <Table miw={700} highlightOnHover withTableBorder stickyHeader>
            <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
              <Table.Tr>
                <Table.Th className={classes.headerCell}>Company Name</Table.Th>
                <Table.Th className={classes.headerCell}>City Coverage</Table.Th>
                <Table.Th className={classes.headerCell}>Service Type</Table.Th>
                <Table.Th className={classes.headerCell}>Status</Table.Th>
                <Table.Th className={classes.headerCell}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pageData.map((row, idx) => (
                <Table.Tr key={idx + startIndex}>
                  <Table.Td>{row.companyName}</Table.Td>
                  <Table.Td>{row.citysCoverage.join(', ') || 'N/A'}</Table.Td>
                  <Table.Td>{row.serviceType}</Table.Td>
                  <Table.Td>
                    <Badge
                      variant="dot"
                      size='xs'
                      color={row.status.toLowerCase() === 'active' ? 'green' : 'red'}
                    >
                      {row.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Button.Group>
                      <Button size="compact-xs" onClick={() => handleView(row)}>
                        <IconEye stroke={1.5} size={18} />
                      </Button>
                      <Button
                        size="compact-xs"
                        variant="outline"
                        color="blue"
                        onClick={() => handleChat(row)}
                        disabled={!row.whatsapp}
                      >
                        <IconBrandWhatsapp stroke={1.5} size={18} />
                      </Button>
                    </Button.Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <Group justify="center" mt="md">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
          />
        </Group>
      </Container>
    </>
  );
}

export default ResultsTable;