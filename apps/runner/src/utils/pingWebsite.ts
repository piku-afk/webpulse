import https from 'node:https';

import { logger } from '@webpulse/logger';

export const pingWebsite = async (website: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const url = new URL(website);

    https.get(url.toString(), (res) => {
      if (res.statusCode === 200) {
        resolve(website);
        logger.info(`Website ${website} is reachable`);
      } else {
        const errorMessage = `Website ${website} is not reachable`;
        reject(new Error(errorMessage));
        logger.error(errorMessage);
      }
    });
  });
};
