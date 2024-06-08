import { getAllWebsites, saveReport } from './utils/db.js';
import { generateLighthouseReport } from './utils/lighthouse.js';
import { pingWebsite } from './utils/pingWebsite.js';
import { uploadReport } from './utils/supabase.js';

const websites = await getAllWebsites();

for (const website of websites) {
  const url = website.url;
  await pingWebsite(url);
  const report = await generateLighthouseReport(url);
  await saveReport(website.id, report?.lhr);
  await uploadReport(report?.report);
}
