import { Kysely, PostgresDialect } from 'kysely';
import type { KyselifyDatabase } from 'kysely-supabase';
import pg from 'pg';

import type { Database as SupabaseDatabase } from '@prisma/dbTypes.js';

type Database = KyselifyDatabase<SupabaseDatabase>;

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    }),
  }),
});
