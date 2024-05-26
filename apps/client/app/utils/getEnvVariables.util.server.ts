import { z } from 'zod';

const envVariablesSchema = z.object({
  COOKIE_SECRET: z.string(),
  WEBPULSE_API_HOST: z.string().url(),
});

const envVariables = envVariablesSchema.parse(process.env);

export const getEnvVariables = () => envVariables;
