import { LoadingOverlay } from '@mantine/core';

export const Loader = () => {
  return (
    <LoadingOverlay
      visible
      loaderProps={{ color: 'dracula' }}
      overlayProps={{ backgroundOpacity: 0, color: '#fff' }}
    />
  );
};
