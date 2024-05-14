import { MantineProvider } from '@mantine/core';
import { StrictMode, Suspense, type PropsWithChildren } from 'react';

import '@mantine/core/styles.css';

export default ({ children }: PropsWithChildren) => {
  return (
    <StrictMode>
      <Suspense>
        <MantineProvider>{children}</MantineProvider>
      </Suspense>
    </StrictMode>
  );
};
