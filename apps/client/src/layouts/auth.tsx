import { Center, Group, Image, Paper } from '@mantine/core';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Lighthouse from '../assets/lighthouse.svg';
import { DefaultLoader } from '../components/DefaultLoader';

export const Component = () => {
  return (
    <Suspense fallback={<DefaultLoader />}>
      <Group grow justify="center" align="stretch" style={{ height: '100vh', padding: 24 }}>
        <Outlet />
        <Paper visibleFrom="md" shadow="md" radius="lg">
          <Center
            style={{
              backgroundColor: 'var(--mantine-color-dracula-2)',
              borderRadius: 16,
              height: '100%',
            }}
          >
            <Image w={360} src={Lighthouse} alt="Lighthouse" />
          </Center>
        </Paper>
      </Group>
    </Suspense>
  );
};
