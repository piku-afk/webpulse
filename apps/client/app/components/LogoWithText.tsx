import { Group, Image, Title, type GroupProps } from '@mantine/core';
import { NavLink } from '@remix-run/react';

import { Routes } from '#constants/routes';

type LogoWithTextProps = Omit<GroupProps, 'gap' | 'renderRoot'>;

export const LogoWithText = (props: LogoWithTextProps) => {
  return (
    <Group
      gap="xs"
      renderRoot={({ style, ...restProps }) => (
        <NavLink to={Routes.home} style={{ ...style, textDecoration: 'none' }} {...restProps} />
      )}
      {...props}
    >
      <Image src="/heartPulse.svg" alt="" style={{ width: 34, height: 34 }} />
      <Title order={1} size="h3" styles={(theme) => ({ root: { color: theme.black } })}>
        webpulse
      </Title>
    </Group>
  );
};
