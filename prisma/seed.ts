import { isDeepStrictEqual } from 'node:util';
import { auditDetails } from 'apps/constants/auditDetails.js';
import { logger } from 'apps/shared/logger.js';
import { Kysely, PostgresDialect } from 'kysely';
import type { KyselifyDatabase } from 'kysely-supabase';
import pg from 'pg';

import type { Database as SupabaseDatabase } from '@prisma/dbTypes.js';

type Database = KyselifyDatabase<SupabaseDatabase>;

const connectionString = process.env.DATABASE_URL;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString,
    }),
  }),
});

try {
  logger.info('Start Seeding');
  const savedAuditDetails = await db.selectFrom('audit_details').selectAll().execute();

  if (isDeepStrictEqual(auditDetails, savedAuditDetails)) {
    logger.info('Already Seeded');
  } else {
    await db.insertInto('audit_details').values(auditDetails).execute();

    logger.info('Complete Seeding');
  }
} catch (error) {
  logger.error('Error Seeding');
  logger.error(error);
} finally {
  await db.destroy();
}
