import { logger } from '@webpulse/logger';
import type { RefreshToken, SignIn } from '@webpulse/schemas';

import { refreshToken, signIn } from './auth.service.js';

export const handleSignIn: GenericRouteHandler<{
  Body: SignIn['body'];
  Reply: { 200: SignIn['response']; 500: SignIn['error'] };
}> = async (req, rep) => {
  const { email, password } = req.body;

  const { data, error } = await signIn(email, password);

  if (error) {
    logger.error(error);
    return rep.code(500).send({ message: error.message });
  }

  const { access_token, refresh_token } = data.session;

  return rep.code(200).send({
    access_token,
    refresh_token,
  });
};

export const handleRefreshToken: GenericRouteHandler<{
  Body: RefreshToken['body'];
  Reply: { 200: RefreshToken['response']; 500: RefreshToken['error'] };
}> = async (req, rep) => {
  const { refresh_token } = req.body;

  const { data, error } = await refreshToken(refresh_token);
  const session = data.session;

  if (error) {
    logger.error(error);
    return rep.code(500).send({ message: error.message });
  }

  if (session) {
    const { access_token, refresh_token } = session;

    return rep.code(200).send({
      access_token,
      refresh_token,
    });
  }

  return rep.code(500).send({
    message: 'Something went wrong',
  });
};
