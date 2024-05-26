import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Form } from '@remix-run/react';

import { Routes } from '#constants/routes';

export const SessionExpiredModal = () => {
  return (
    <Form method="POST" action={Routes.signOut}>
      <Text c="dimmed" size="sm">
        You session has expired please login again to continue using the app
      </Text>

      <Button type="submit" fullWidth mt="md" onClick={() => modals.closeAll()}>
        Sign In
      </Button>
    </Form>
  );
};
