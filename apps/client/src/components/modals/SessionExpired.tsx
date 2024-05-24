import { Button, Text } from '@mantine/core';

import { router, Routes } from '../../routes';

export const SessionExpiredModal = () => {
  const handleClick = () => {
    router.navigate(Routes.signIn);
  };

  return (
    <>
      <Text c="dimmed" size="sm">
        It looks like your session has expired. For your security, please sign in again to continue.
      </Text>
      <Button fullWidth mt="md" onClick={handleClick}>
        Sign In
      </Button>
    </>
  );
};
