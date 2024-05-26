import { redirect } from '@remix-run/node';

import { Routes } from '#constants/routes';

import { getSignOutHeaders } from '../session.server';

export const action = async () => {
  return redirect(Routes.signIn, { headers: await getSignOutHeaders() });
};
