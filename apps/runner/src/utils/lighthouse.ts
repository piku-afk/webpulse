import lighthouse, { type RunnerResult } from 'lighthouse';
import puppeteer, { type PuppeteerLaunchOptions } from 'puppeteer';

import { logger } from '@webpulse/logger';

const puppeteerConfig: PuppeteerLaunchOptions = {
  headless: 'shell',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
  ],
};

export const generateLighthouseReport = async (url: string): Promise<RunnerResult | undefined> => {
  const browser = await puppeteer.launch(puppeteerConfig);
  const { port } = new URL(browser.wsEndpoint());
  logger.info(`Browser Port: ${port}`);

  const result = await lighthouse(url, {
    port: +port,
    logLevel: 'warn',
    onlyCategories: ['performance'],
  });

  await browser.close();
  return result;
};
