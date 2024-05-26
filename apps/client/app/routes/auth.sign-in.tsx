import {
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  Image,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { ActionFunctionArgs } from '@remix-run/node';
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
  type MetaFunction,
} from '@remix-run/react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';

import type { SignIn } from '@webpulse/schemas';

import { getEnvVariables } from '#utils/getEnvVariables.util.server';
import { hasErrorMessage } from '#utils/hasErrorMessage';
import { notifyError } from '#utils/notify';
import { Routes } from '#constants/routes';

import { getSignInHeaders } from '../session.server';

export const meta: MetaFunction = () => [{ title: 'Webpulse | Sign in' }];

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must contain at least 6 character(s)' }),
  remember: z.boolean(),
});

export const action = async (params: ActionFunctionArgs) => {
  const { request } = params;
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const remember = form.get('remember') === 'on';

  const validate = zodResolver(signInSchema);
  const formErrors = validate({ email, password, remember });
  if (Object.keys(formErrors).length) {
    return json({ formErrors }, 400);
  }

  try {
    const url = new URL('/api/auth/sign-in', getEnvVariables().WEBPULSE_API_HOST);
    const res = await fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data: SignIn['response'] | SignIn['error'] = await res.json();

    if ('message' in data) {
      throw Error(data.message);
    }

    const headers = await getSignInHeaders({ ...data, remember });

    return redirect(Routes.home, {
      headers,
    });
  } catch (error) {
    if (hasErrorMessage(error)) {
      return json({ error: error.message });
    }
  }
};

const AuthSignIn = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  useEffect(() => {
    if (actionData && 'error' in actionData && typeof actionData.error === 'string') {
      notifyError({ message: actionData.error });
    }
  }, [actionData]);

  const errors = useMemo(() => {
    if (actionData && 'formErrors' in actionData) {
      return {
        email: actionData.formErrors?.email ?? '',
        password: actionData.formErrors?.password ?? '',
      };
    }
    return { email: '', password: '' };
  }, [actionData]);

  const submitting = navigation.state === 'submitting';

  return (
    <Center style={{ flexDirection: 'column', maxWidth: 'none' }}>
      <Box miw={{ base: '100%', sm: 360 }}>
        <Form method="POST">
          <Box mx="auto" mb={24} style={{ width: 56, height: 56 }}>
            <Image w={56} h={56} src="/heartPulse.svg" alt="webpulse" />
          </Box>
          <Title order={1} mb={8} ta="center">
            Welcome back
          </Title>
          <Text c="dimmed" mb={32} ta="center">
            Welcome back! Please enter your details
          </Text>
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="username"
            placeholder="Enter your email"
            size="md"
            error={errors?.email as string}
            disabled={submitting}
          />

          <PasswordInput
            id="current-password"
            name="password"
            label="Password"
            autoComplete="current-password"
            placeholder="********"
            mt={20}
            size="md"
            error={errors?.password as string}
            disabled={submitting}
          />

          <Group mt={18} justify="space-between">
            <Checkbox
              id="remember"
              name="remember"
              label="Remember for 7 days"
              size="xs"
              radius="sm"
              color="dracula"
              styles={{ label: { fontSize: 14, paddingLeft: 8 } }}
            />
          </Group>

          <Button type="submit" fullWidth size="md" mt={24} color="dracula" loading={submitting}>
            Sign In
          </Button>
        </Form>
      </Box>
    </Center>
  );
};

export default AuthSignIn;
