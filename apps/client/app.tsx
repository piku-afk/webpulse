import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes.js';
import { theme } from './theme.js';

export const createApp = (url) => {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>
  );
};
