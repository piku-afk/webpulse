import { createCookieSessionStorage } from '@remix-run/node';

import { getCommonEnvVariables } from './environment.js';

export enum CookiesName {
  accessToken = 'access_token',
  refreshToken = 'refresh_token',
}

interface SessionData {
  [CookiesName.accessToken]: string;
  [CookiesName.refreshToken]: string;
}

const { commitSession, destroySession, getSession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: '__session',
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
    isSigned: true,
    secrets: [getCommonEnvVariables().COOKIE_SECRET],
    maxAge: undefined,
  },
});

export const getSessionData = async (
  cookie: string | null | undefined,
): Promise<Partial<SessionData>> => {
  const session = await getSession(cookie);

  return {
    access_token: session.get(CookiesName.accessToken),
    refresh_token: session.get(CookiesName.refreshToken),
  };
};

export const isAuthenticated = async (cookie: string | null | undefined): Promise<boolean> => {
  const session = await getSession(cookie);

  return session.has(CookiesName.accessToken);
};

export const getSignInHeaders = async (
  data: SessionData & { remember: boolean },
): Promise<Headers> => {
  const { access_token, refresh_token, remember } = data;

  const session = await getSession();
  session.set(CookiesName.accessToken, access_token);
  session.set(CookiesName.refreshToken, refresh_token);

  const headers = new Headers();
  headers.set(
    'Set-Cookie',
    await commitSession(session, { maxAge: remember ? 60 * 60 * 24 * 7 : undefined }),
  );

  return headers;
};

export const getSignOutHeaders = async (cookie: string | null | undefined): Promise<Headers> => {
  const session = await getSession(cookie);
  
  const headers = new Headers();
  headers.set('Set-Cookie', await destroySession(session));

  return headers;
};
