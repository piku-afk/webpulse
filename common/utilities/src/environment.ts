import { z } from 'zod';

export const commonEnvVariablesSchema = z.object({
  COOKIE_SECRET: z.string(),
});

const clientEnvVariables = commonEnvVariablesSchema.parse(process.env);

export const getCommonEnvVariables = () => clientEnvVariables;
