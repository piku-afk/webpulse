import { sql } from 'kysely';

import { db } from '#utils/db.js';

/**
 * Checks the health of the database
 * @returns {Promise<boolean>} A promise indicating the health status.
 */
export const checkDatabaseHealth = async (): Promise<boolean> => {
  const { rows } = await sql<{ result: 1 }>`SELECT 1 as result`.execute(db);

  return !!rows[0]?.result;
};

/**
 * Returns the current timestamp
 * @returns {string} The current timestamp
 */
export const getCurrentTimeStamp = (): string => new Date().toISOString();
