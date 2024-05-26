import { ActionIcon, Avatar, Box, Button, Container, Group, Menu, Paper } from '@mantine/core';
import { Form, NavLink } from '@remix-run/react';
import Cookies from 'js-cookie';
import { LogOut, Settings } from 'lucide-react';

import { CookiesName } from '#constants/cookieNames';
import { Routes } from '#constants/routes';

import { LogoWithText } from './LogoWithText';

export const Header = () => {
  const handleLogout = () => {
    Cookies.remove(CookiesName.accessToken);
    Cookies.remove(CookiesName.refreshToken);
  };

  return (
    <Paper component="header" withBorder py={16} mb={24} radius={0}>
      <Container size="lg">
        <Group justify="space-between">
          <LogoWithText />

          <Menu
            shadow="md"
            width={160}
            position="bottom-end"
            transitionProps={{ transition: 'fade-down' }}
          >
            <Menu.Target>
              <Box>
                <Button
                  visibleFrom="sm"
                  variant="light"
                  leftSection={<Avatar variant="transparent" size="sm" color="dracula" />}
                >
                  John Doe
                </Button>

                <ActionIcon hiddenFrom="sm" size="lg" variant="light">
                  <Avatar variant="transparent" size="sm" color="dracula" />
                </ActionIcon>
              </Box>
            </Menu.Target>

            <Menu.Dropdown>
              <NavLink to={Routes.settings} style={{ textDecoration: 'none' }}>
                <Menu.Item leftSection={<Settings size={16} />}>Settings</Menu.Item>
              </NavLink>

              {/* <NavLink to={Routes.signOut} style={{ textDecoration: 'none' }}> */}
              <Form method="POST" action={Routes.signOut}>
                <Menu.Item
                  type="submit"
                  color="red"
                  leftSection={<LogOut size={16} />}
                  onClick={handleLogout}
                >
                  Log out
                </Menu.Item>
              </Form>
              {/* </NavLink> */}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </Paper>
  );
};
