import { Type, type Static } from '@sinclair/typebox';

export const HealthSchema = {
  response: Type.Object({
    database: Type.Boolean(),
    server: Type.Boolean(),
    timeStamp: Type.String(),
  }),
};

export interface Health {
  response: Static<typeof HealthSchema.response>;
}
