import { LoadingOverlay } from '@mantine/core';

export const DefaultLoader = () => {
  return (
    <LoadingOverlay
      visible
      loaderProps={{ color: 'dracula' }}
      overlayProps={{ backgroundOpacity: 0, color: '#fff' }}
    />
  );
};
