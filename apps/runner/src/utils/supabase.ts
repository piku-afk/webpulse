import { createClient } from '@supabase/supabase-js';

import { logger } from '@webpulse/logger';

import { getTodaysDate } from './date.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadReport = async (report: string | string[] | undefined) => {
  const fileName = getTodaysDate();
  const { data, error } = await supabase.storage
    .from('reports')
    .upload(fileName, report, { upsert: true, contentType: 'application/json' });

  if (error) {
    logger.error('Error uploading report to storage');
    throw error;
  }

  const signedUrl = await supabase.storage
    .from('reports')
    .createSignedUrl(fileName, 60 * 60 * 24 * 7);

  if (signedUrl.error) {
    logger.error('Error creating signed url');
    throw signedUrl.error;
  }

  logger.info(`Report uploaded: ${data.path} - ${signedUrl.data.signedUrl}`);
};
