import { createBrowserRouter } from 'react-router-dom';

export enum Routes {
  home = '/',
  signIn = '/auth/sign-in',
}

export const router = createBrowserRouter([
  {
    path: Routes.signIn,
    lazy: () => import('./layout/auth.js'),
    children: [{ index: true, lazy: () => import('./pages/sign-in.js') }],
  },
  { path: Routes.home, children: [{ index: true, lazy: () => import('./pages/home.js') }] },
]);
