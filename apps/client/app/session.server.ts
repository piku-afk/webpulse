import { createCookieSessionStorage } from '@remix-run/node';

import { getEnvVariables } from '#utils/getEnvVariables.util.server';
import { CookiesName } from '#constants/cookieNames';

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
    secrets: [getEnvVariables().COOKIE_SECRET],
    maxAge: undefined,
  },
});

export const isAuthenticated = async (request: Request): Promise<boolean> => {
  const session = await getSession(request.headers.get('Cookie'));

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
    await commitSession(session, { maxAge: remember ? 7 * 24 * 60 * 60 : undefined }),
  );

  return headers;
};

export const getSignOutHeaders = async (): Promise<Headers> => {
  const session = await getSession();

  const headers = new Headers();
  headers.set('Set-Cookie', await destroySession(session));

  return headers;
};
