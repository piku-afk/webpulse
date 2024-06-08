import { Kysely, PostgresDialect, sql } from 'kysely';
import type { KyselifyDatabase } from 'kysely-supabase';
import type { Result } from 'lighthouse';
import pg from 'pg';

import { logger } from '@webpulse/logger';
import type { Database as SupabaseDatabase, Tables, TablesInsert } from '@webpulse/schemas';

import { getTodaysDate } from './date.js';

type Database = KyselifyDatabase<SupabaseDatabase>;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    }),
  }),
});

const health = await sql<{ result: 1 }>`SELECT 1 as result`.execute(db);

if (!health.rows[0]?.result) {
  throw new Error('Not able to connect to database');
}
logger.info('Database connected');

const auditDetails = await db.selectFrom('audit_details').selectAll().execute();

const getReport = async (date: string, websiteId: string): Promise<{ id: string } | undefined> => {
  return await db
    .selectFrom('reports')
    .where('created_at', '=', date)
    .where('websitesId', '=', websiteId)
    .select('id')
    .executeTakeFirst();
};

const getAudit = async (
  reportId: string,
  auditDetailsId: string,
): Promise<{ id: string } | undefined> => {
  return await db
    .selectFrom('audits')
    .where('reportsId', '=', reportId)
    .where('audit_detailsId', '=', auditDetailsId)
    .select('id')
    .executeTakeFirst();
};

const upsertReport = async (
  reportId: string | undefined,
  data: TablesInsert<'reports'>,
): Promise<{
  id: string;
}> => {
  if (reportId) {
    return await db
      .updateTable('reports')
      .where('id', '=', reportId)
      .set(data)
      .returning('id')
      .executeTakeFirstOrThrow();
  } else {
    return await db.insertInto('reports').values(data).returning('id').executeTakeFirstOrThrow();
  }
};

const upsertAudit = async (
  auditId: string | undefined,
  data: TablesInsert<'audits'>,
): Promise<{
  id: string;
}> => {
  if (auditId) {
    return await db
      .updateTable('audits')
      .where('id', '=', auditId)
      .set(data)
      .returning('id')
      .executeTakeFirstOrThrow();
  } else {
    return await db.insertInto('audits').values(data).returning('id').executeTakeFirstOrThrow();
  }
};

export const saveReport = async (websiteId: string, result: Result | undefined): Promise<void> => {
  if (!result) {
    return logger.error('Lighthouse result is not defined');
  }

  const date = getTodaysDate();
  const { id: reportId } = await upsertReport((await getReport(date, websiteId))?.id, {
    websitesId: websiteId,
    created_at: date,
    version: result.lighthouseVersion,
  });

  for (const audit of auditDetails) {
    const { score, numericValue } = result.audits[audit.key];

    await upsertAudit((await getAudit(reportId, audit.id))?.id, {
      reportsId: reportId,
      audit_detailsId: audit.id,
      score: score ? score * 100 : 0,
      actual_value: numericValue ?? 0,
    });
  }

  logger.info('Audits saved in database');
};

export const getAllWebsites = async (): Promise<Tables<'websites'>[]> => {
  return await db.selectFrom('websites').selectAll().execute();
};
