import { sql } from 'kysely';

import { db } from '../../utils/db.js';

/**
 * Checks the health of the database by pinging the database to test the connection.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the health status.
 */
export const checkDatabaseHealth = async (): Promise<boolean> => {
  const { rows } = await sql<{ result: 1 }>`SELECT 1 as result`.execute(db);

  return !!rows[0]?.result;
};

/**
 * Returns the current timestamp in ISO 8601 format.
 *
 * @returns {string} The current timestamp in ISO 8601 format.
 */
export const getCurrentTimeStamp = (): string => new Date().toISOString();
