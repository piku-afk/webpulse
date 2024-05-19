import { Group, Paper } from '@mantine/core';

import { LogoWithText } from './LogoWithText';

export const Header = () => {
  return (
    <Paper component="header" withBorder style={{ padding: 16 }}>
      <Group>
        <LogoWithText />
      </Group>
    </Paper>
  );
};
