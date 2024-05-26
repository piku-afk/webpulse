import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Suspense, type PropsWithChildren } from 'react';

import { Loader } from '#components/Loader';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';

import { Notifications } from '@mantine/notifications';

import { theme } from './theme';

export const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/heartPulse.svg" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
          <Notifications position="top-center" limit={2} />
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};
export default App;
