import { Type, type Static } from '@sinclair/typebox';

export const SignInSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: Type.Object({
    access_token: Type.String(),
    refresh_token: Type.String(),
  }),
  error: Type.Object({
    message: Type.String(),
  }),
};

export interface SignIn {
  body: Static<typeof SignInSchema.body>;
  response: Static<typeof SignInSchema.response>;
  error: Static<typeof SignInSchema.error>;
}
