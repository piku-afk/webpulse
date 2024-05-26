import { modals, ModalsProvider } from '@mantine/modals';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, Outlet, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';

import { Header } from '#components/Header';
import { modalConfig, ModalIds } from '#constants/modals';

import { isAuthenticated } from '../session.server';

export const loader = async (params: LoaderFunctionArgs) => {
  return json({ isAuthenticated: await isAuthenticated(params.request) });
};

const PrivateLayout = () => {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!isAuthenticated) {
      modals.openContextModal({
        modal: ModalIds.sessionExpired,
        title: 'Session Expired',
        size: 'sm',
        centered: true,
        innerProps: null,
        withCloseButton: false,
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 3,
        },
        styles: {
          title: { fontWeight: 600 },
        },
      });
    }
  }, [isAuthenticated]);

  return (
    <ModalsProvider modals={modalConfig}>
      <Header />
      {isAuthenticated && <Outlet />}
    </ModalsProvider>
  );
};

export default PrivateLayout;
