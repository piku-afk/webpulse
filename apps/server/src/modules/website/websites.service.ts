import type { Tables } from '@webpulse/schemas';

import { db } from '#utils/db.js';

export const fetchWebsites = async (): Promise<Tables<'websites'>[]> => {
  return db.selectFrom('websites').selectAll().execute();
};
