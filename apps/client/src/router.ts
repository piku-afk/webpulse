import { createBrowserRouter } from 'react-router-dom';

export enum Routes {
  home = '/',
}

export const router = createBrowserRouter([
  {
    path: Routes.home,
    lazy: () => import('./layouts/default'),
    children: [{ index: true, lazy: () => import('./pages/home') }],
  },
]);
