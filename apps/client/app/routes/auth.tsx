import { Center, Group, Image, Paper } from '@mantine/core';
import { Outlet } from '@remix-run/react';
import Lighthouse from '#assets/lighthouse.svg';

const AuthLayout = () => {
  return (
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
  );
};

export default AuthLayout;
