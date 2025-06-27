import { TextInput, Select, Group, Container, Kbd, Tooltip } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

interface FilterProps {
  data?: any[];
  onFilterChange?: (filters: {
    city: string;
    service: string;
    search: string;
  }) => void;
}

function Filters({ data = [], onFilterChange }: FilterProps) {
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Add hotkey for Ctrl+K to focus search
  useHotkeys([
    ['ctrl+K', () => {
      searchInputRef.current?.focus();
    }],
    ['cmd+K', () => {
      searchInputRef.current?.focus();
    }],
  ]);

  // Extract unique cities dynamically from sheet columns
  const getUniqueCities = () => {
    const citySet = new Set<string>();

    if (data.length > 0) {
      // Get all column names from the first row
      const columns = Object.keys(data[0]);

      // Find city columns (excluding non-city columns)
      const cityColumns = columns.filter(col =>
        col !== 'Company Name' &&
        col !== 'Service Type' &&
        col !== 'Status' &&
        col !== 'Whatsapp' &&
        !col.startsWith('Column') // Exclude generic column names
      );

      data.forEach(row => {
        cityColumns.forEach(cityCol => {
          if (row[cityCol] === 'TRUE' || row[cityCol] === true || row[cityCol] === '1') {
            citySet.add(cityCol);
          }
        });
      });
    }

    const cityOptions = Array.from(citySet).sort().map(city => ({
      value: city.toLowerCase().replace(/\s+/g, '-'), // Normalize spaces to hyphens for value
      label: city
    }));

    // Add "All Cities" option at the beginning
    return [{ value: '', label: 'All Cities' }, ...cityOptions];
  };

  // Extract and split services by comma
  const getUniqueServices = () => {
    const serviceSet = new Set<string>();
    data.forEach(row => {
      if (row['Service Type'] && row['Service Type'] !== 'N/A') {
        // Split by comma and trim whitespace
        const services = row['Service Type'].split(',').map((s: string) => s.trim());
        services.forEach((service: string) => {
          if (service) {
            serviceSet.add(service);
          }
        });
      }
    });
    const serviceOptions = Array.from(serviceSet).sort().map(service => ({
      value: service.toLowerCase(),
      label: service
    }));

    // Add "All Services" option at the beginning
    return [{ value: '', label: 'All Services' }, ...serviceOptions];
  };

  const cities = getUniqueCities();
  const services = getUniqueServices();

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ city, service, search });
    }
  }, [city, service, search, onFilterChange]);

  return (
    <Container>
      <Group gap="md" grow>
        <Select
          label="City Coverage"
          placeholder="Select city"
          data={cities}
          searchable
          clearable
          value={city}
          onChange={(value) => setCity(value || '')}
        />
        <Select
          label="Service Type"
          placeholder="Select service"
          data={services}
          searchable
          clearable
          value={service}
          onChange={(value) => setService(value || '')}
        />
        <Tooltip
          label={
            <Group gap={4}>
              <span>Press</span>
              <Kbd size="xs">Ctrl</Kbd>
              <span>+</span>
              <Kbd size="xs">K</Kbd>
              <span>to focus</span>
            </Group>
          }
          position="bottom"
          withArrow
        >
          <TextInput
            ref={searchInputRef}
            label="Search"
            placeholder="Search company names..."
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            rightSection={
              <Group gap={2}>
                <Kbd size="xs">Ctrl</Kbd>
                <span style={{ fontSize: '10px' }}>+</span>
                <Kbd size="xs">K</Kbd>
              </Group>
            }
          />
        </Tooltip>
      </Group>
    </Container>
  );
}

export default Filters;