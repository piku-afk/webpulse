import { modals } from '@mantine/modals';
import Cookies from 'js-cookie';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { DefaultLoader } from '../components/DefaultLoader';
import { CookiesName } from '../constants/cookieNames';
import { ModalIds } from '../constants/modals';

export const Component = () => {
  useEffect(() => {
    if (!Cookies.get(CookiesName.accessToken)) {
      modals.openContextModal({
        modal: ModalIds.sessionExpired,
        withCloseButton: false,
        centered: true,
        innerProps: null,
        size: 'sm',
        title: 'Session Expired',
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 5,
        },
        styles: {
          title: { fontWeight: 600 },
        },
      });
    }
  }, []);

  return (
    <Suspense fallback={<DefaultLoader />}>
      <Outlet />
    </Suspense>
  );
};
