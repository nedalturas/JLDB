import { TextInput, Select, Group, Container } from '@mantine/core';
import { useState, useEffect } from 'react';

interface FilterProps {
  onFilterChange?: (filters: {
    city: string;
    service: string;
    search: string;
  }) => void;
}

function Filters({ onFilterChange }: FilterProps) {
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const [search, setSearch] = useState('');

  const cities = [
    { value: 'dubai', label: 'Dubai' },
    { value: 'abu dhabi', label: 'Abu Dhabi' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'ajman', label: 'Ajman' },
    { value: 'al ain', label: 'Al Ain' },
  ];

  const services = [
    { value: 'home cleaning', label: 'Home Cleaning' },
    { value: 'carwash', label: 'Carwash' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'painting', label: 'Painting' },
    { value: 'carpentry', label: 'Carpentry' },
  ];

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