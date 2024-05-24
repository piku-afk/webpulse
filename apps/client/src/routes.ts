import { createBrowserRouter } from 'react-router-dom';

export enum Routes {
  home = '/',
  signIn = '/auth/sign-in',
  status = '/status',
  settings = '/settings',
}

export const router = createBrowserRouter([
  {
    path: Routes.signIn,
    lazy: () => import('./layouts/auth'),
    children: [{ index: true, lazy: () => import('./pages/auth/signIn') }],
  },
  {
    path: Routes.status,
    lazy: () => import('./pages/status'),
  },
  {
    path: Routes.home,
    lazy: () => import('./layouts/private'),
    children: [
      { index: true, lazy: () => import('./pages/home') },
      { path: Routes.settings, lazy: () => import('./pages/settings') },
    ],
  },
]);
