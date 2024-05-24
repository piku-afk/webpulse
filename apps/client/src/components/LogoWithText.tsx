import { Group, Image, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';

export const LogoWithText = () => {
  return (
    <Link to={Routes.home} style={{ textDecoration: 'none' }}>
      <Group gap="xs">
        <Image src="/heartPulse.svg" alt="webpulse" style={{ width: 34, height: 34 }} />
        <Title order={1} size="h3" styles={(theme) => ({ root: { color: theme.black } })}>
          webpulse
        </Title>
      </Group>
    </Link>
  );
};
