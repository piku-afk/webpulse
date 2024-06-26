import type { Health } from '@webpulse/schemas';

import { checkDatabaseHealth, getCurrentTimeStamp } from './health.service.js';

export const getHealth: GenericRouteHandler<{
  Reply: { 200: Health['response'] };
}> = async (_req, rep) => {
  return rep.code(200).send({
    database: await checkDatabaseHealth(),
    server: true,
    timeStamp: getCurrentTimeStamp(),
  });
};
