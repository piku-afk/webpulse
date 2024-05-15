import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DefaultLoader } from '../components/DefaultLoader';

export const Component = () => {
  return (
    <Suspense fallback={<DefaultLoader />}>
      <Outlet />
    </Suspense>
  );
};
