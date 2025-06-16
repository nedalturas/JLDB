import { useState } from 'react';
import { Table, ScrollArea, Group, Text, Container, Button, Modal, Badge } from '@mantine/core';

const mockData = [
  {
    city: 'Dubai',
    service: 'Cleaning',
    name: 'John Doe',
    status: 'Active',
  },
  {
    city: 'Abu Dhabi',
    service: 'Plumbing',
    name: 'Jane Smith',
    status: 'Inactive',
  },
  // Add more mock rows as needed
];

function ResultsTable() {
  const [opened, setOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleView = (row) => {
    setSelectedRow(row);
    setOpened(true);
  };

  return (
    <>
      <Container>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Details"
          centered
        >
          {selectedRow ? (
            <div>
              <Text><b>City:</b> {selectedRow.city}</Text>
              <Text><b>Service:</b> {selectedRow.service}</Text>
              <Text><b>Name:</b> {selectedRow.name}</Text>
              <Text><b>Status:</b> {selectedRow.status}</Text>
            </div>
          ) : null}
        </Modal>
        <ScrollArea>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>City</Table.Th>
                <Table.Th>Service</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockData.map((row, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>{row.city}</Table.Td>
                  <Table.Td>{row.service}</Table.Td>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={row.status === 'Active' ? 'green' : 'red'}>
                      {row.status}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button size="xs" onClick={() => handleView(row)}>
                        View
                      </Button>
                      <Button size="xs" variant="outline" color="blue">
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
