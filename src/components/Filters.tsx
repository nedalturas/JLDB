import { TextInput, NumberInput, Select, Group, Container } from '@mantine/core';

const cities = [
  { value: 'dubai', label: 'Dubai' },
  { value: 'abu_dhabi', label: 'Abu Dhabi' },
  { value: 'sharjah', label: 'Sharjah' },
  // Add more cities as needed
];

const services = [
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  // Add more services as needed
];

function Filters() {
  return (
    <Container  >
      <Group gap="md" grow>
        <Select
          label="City Coverage"
          placeholder="Select city"
          data={cities}
          searchable
        />
        <Select
          label="Service Type"
          placeholder="Select service"
          data={services}
          searchable
        />
        <TextInput
          label="Search"
          placeholder="Type to search"
        />
      </Group>
    </Container>

  );
}

export default Filters;
