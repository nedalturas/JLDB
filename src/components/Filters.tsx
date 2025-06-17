import { TextInput, Select, Group, Container } from '@mantine/core';
import { useState, useEffect } from 'react';

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

  // Extract unique cities and services from the actual data
  const getUniqueCities = () => {
    const citySet = new Set<string>();
    data.forEach(row => {
      if (row['Dubai'] === 'TRUE' || row['Dubai'] === true) citySet.add('Dubai');
      if (row['Abu Dhabi'] === 'TRUE' || row['Abu Dhabi'] === true) citySet.add('Abu Dhabi');
      if (row['Sharjah'] === 'TRUE' || row['Sharjah'] === true) citySet.add('Sharjah');
      if (row['Ajman'] === 'TRUE' || row['Ajman'] === true) citySet.add('Ajman');
      if (row['Al Ain'] === 'TRUE' || row['Al Ain'] === true) citySet.add('Al Ain');
    });
    return Array.from(citySet).sort().map(city => ({ value: city.toLowerCase(), label: city }));
  };

  const getUniqueServices = () => {
    const serviceSet = new Set<string>();
    data.forEach(row => {
      if (row['Service Type'] && row['Service Type'] !== 'N/A') {
        serviceSet.add(row['Service Type']);
      }
    });
    return Array.from(serviceSet).sort().map(service => ({ value: service.toLowerCase(), label: service }));
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
        <TextInput
          label="Search"
          placeholder="Search company names..."
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Group>
    </Container>
  );
}

export default Filters;