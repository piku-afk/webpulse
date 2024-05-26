import {
  Alert,
  Box,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { Await, defer, useLoaderData, type MetaFunction } from '@remix-run/react';
import { Check, X } from 'lucide-react';
import { Suspense } from 'react';

import type { Health } from '@webpulse/schemas';

import { getEnvVariables } from '#utils/getEnvVariables.util.server';

import { LogoWithText } from '../components/LogoWithText';

export const meta: MetaFunction = () => [
  { title: 'Webpulse | Status' },
  {
    name: 'description',
    content: "Welcome to Webpulse's home for real-time data on system performance.",
  },
];

export const loader = async () => {
  const url = new URL('/api/health', getEnvVariables().WEBPULSE_API_HOST).toString();

  return defer({
    health: fetch(url).then(async (res) => res.json() as Promise<Health['response']>),
  });
};

const Status = () => {
  const { health } = useLoaderData<typeof loader>();

  return (
    <Container component="main" py={24}>
      <LogoWithText mb={32} />

      <Suspense fallback={<Skeleton h={56} />}>
        <Await resolve={health}>
          {(health) =>
            Object.values(health).every(Boolean) ? (
              <Alert color="teal" title="All System Operational" />
            ) : (
              <Alert color="red" title="System Issues Detected" />
            )
          }
        </Await>
      </Suspense>

      <Paper mt={24} withBorder p={0}>
        <SimpleGrid cols={2} spacing="none">
          <Suspense
            fallback={Array.from(Array(2).keys()).map((item, index) => (
              <Box
                p={16}
                component="section"
                key={item}
                style={(theme) => ({
                  borderRight: index % 2 === 0 ? `1px solid ${theme.colors.gray[3]}` : undefined,
                })}
              >
                <Skeleton height={28} />
              </Box>
            ))}
          >
            <Await resolve={health}>
              {(health) =>
                Object.entries(health)
                  .filter(([appName]) => appName !== 'timeStamp')
                  .map(([appName, status], index) => (
                    <Box
                      p={16}
                      component="section"
                      key={appName}
                      style={(theme) => ({
                        borderRight:
                          index % 2 === 0 ? `1px solid ${theme.colors.gray[3]}` : undefined,
                      })}
                    >
                      <Group justify="space-between">
                        <Box>
                          <Text size="md" mb={2} tt="capitalize">
                            {appName}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {status}
                          </Text>
                        </Box>

                        <ThemeIcon
                          variant="light"
                          color={status ? 'teal' : 'red'}
                          radius="xl"
                          size="md"
                        >
                          {status ? <Check size={18} /> : <X size={18} />}
                        </ThemeIcon>
                      </Group>
                    </Box>
                  ))
              }
            </Await>
          </Suspense>
        </SimpleGrid>
      </Paper>
    </Container>
  );
};

export default Status;
