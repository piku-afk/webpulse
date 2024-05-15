import { Type, type Static } from '@sinclair/typebox';

export const RefreshTokenSchema = {
  body: Type.Object({
    refresh_token: Type.String(),
  }),
  response: Type.Object({
    access_token: Type.String(),
    refresh_token: Type.String(),
  }),
  error: Type.Object({
    message: Type.String(),
  }),
};

export interface RefreshToken {
  body: Static<typeof RefreshTokenSchema.body>;
  response: Static<typeof RefreshTokenSchema.response>;
  error: Static<typeof RefreshTokenSchema.error>;
}
