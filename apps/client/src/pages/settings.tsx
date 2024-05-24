import { Button, Container, Group, Table, Title } from '@mantine/core';
import { Cross } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';

export const Component = () => {
  return (
    <Container component="main" py={24}>
      <Group justify="space-between" mb={24}>
        <Title order={2} size="h2">
          Settings
        </Title>

        <Link to={Routes.status}>
          <Button variant="filled" leftSection={<Cross size={16} />}>
            Check Status
          </Button>
        </Link>
      </Group>

      <Title order={3} size="h3" mb={16}>
        Saved Websites
      </Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>ID</Table.Td>
            <Table.Td>URL</Table.Td>
            <Table.Td>Name</Table.Td>
            <Table.Td>Status</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>1</Table.Td>
            <Table.Td>website url</Table.Td>
            <Table.Td>website name</Table.Td>
            <Table.Td>website status</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
};
