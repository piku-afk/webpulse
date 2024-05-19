import {
  Alert,
  Box,
  Card,
  Container,
  Group,
  Skeleton,
  Table,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { Check, X } from 'lucide-react';

import { useGetHealthQuery } from '../apis/health.api';
import { Header } from '../components/Header';

interface TableDataProps {
  name: string;
  status: boolean;
}

const TableData = (props: TableDataProps) => {
  const { name, status } = props;
  const statusText = status ? 'Normal' : 'Down';

  return (
    <Table.Td p={16}>
      <Group justify="space-between">
        <Box>
          <Text size="md" mb={2}>
            {name}
          </Text>
          <Text size="xs" c="dimmed">
            {statusText}
          </Text>
        </Box>

        <ThemeIcon variant="light" color={status ? 'teal' : 'red'} radius="xl" size="md">
          {status ? <Check size={18} /> : <X size={18} />}
        </ThemeIcon>
      </Group>
    </Table.Td>
  );
};

const TableDataSkeleton = () => {
  return (
    <Table.Td p={16}>
      <Skeleton mb={8} height={24} />
      <Skeleton width="20%" height={16} />
    </Table.Td>
  );
};

export const Component = () => {
  const { isLoading, data } = useGetHealthQuery();
  const { database, server } = data ?? {};

  const appStatuses = [
    { name: 'Server', status: server },
    { name: 'Database', status: database },
  ];

  const isNormal = appStatuses.map(app => app.status).every(Boolean);

  return (
    <Box>
      <Header />

      <Container component='main' py={24}>
        <Skeleton visible={isLoading}>
          {isNormal ? (
            <Alert color="teal" title="All System Operational" />
          ) : (
            <Alert color="red" title="System Issues Detected" />
          )}
        </Skeleton>

        <Card mt={24} withBorder shadow="sm" p={0}>
          <Table withColumnBorders>
            <Table.Tbody>
              {isLoading
                ? splitArray(appStatuses).map((items) => (
                    <Table.Tr key={items[0].name}>
                      {items.map((item) => (
                        <TableDataSkeleton key={item.name} />
                      ))}
                    </Table.Tr>
                  ))
                : splitArray(appStatuses).map(([item1, item2]) => (
                    <Table.Tr key={item1.name}>
                      <TableData name={item1.name} status={item1.status ?? false} />
                      <TableData name={item2.name} status={item2.status ?? false} />
                    </Table.Tr>
                  ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Container>
    </Box>
  );
};

const splitArray = (items: { name: string; status: boolean | undefined }[]) => {
  const rows = [];

  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return rows;
};
