import {
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import Cookies from 'js-cookie';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSignInMutation } from '../../apis/auth.api';
import { CookiesName } from '../../constants/cookieNames';
import { Routes } from '../../routes';
import { hasErrorMessage } from '../../utils/hasErrorMessage';
import { notifyError } from '../../utils/notify';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must contain at least 6 character(s)' }),
  remember: z.boolean(),
});

export const Component = () => {
  const navigate = useNavigate();
  const [signInMutation, { error, isError, isLoading }] = useSignInMutation();
  const { getInputProps, onSubmit } = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', remember: false },
    validate: zodResolver(signInSchema),
  });

  useEffect(() => {
    modals.closeAll();
  }, []);

  useEffect(() => {
    if (isError) {
      if ('data' in error && typeof error.data === 'object') {
        const { message = '' } = error.data as { message: string };
        notifyError({ message });
      }
    }
  }, [error, isError]);

  const handleSubmit = async (formData: z.infer<typeof signInSchema>) => {
    const { email, password, remember } = formData;

    try {
      const { access_token, refresh_token } = await signInMutation({ email, password }).unwrap();

      const cookieOptions: typeof Cookies.attributes = {
        domain: window.location.hostname,
        sameSite: 'strict',
        secure: true,
        ...(remember && { expires: 7 }),
      };

      Cookies.set(CookiesName.accessToken, access_token, cookieOptions);
      Cookies.set(CookiesName.refreshToken, refresh_token, cookieOptions);

      navigate(Routes.home);
    } catch (error) {
      if (hasErrorMessage(error)) {
        notifyError({ message: error.message });
      }
    }
  };

  return (
    <Center component={Paper} style={{ flexDirection: 'column', maxWidth: 'none' }}>
      <Box component="form" onSubmit={onSubmit(handleSubmit)} miw={{ base: '100%', sm: 360 }}>
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
          size="md"
          type="email"
          label="Email"
          placeholder="Enter your email"
          {...getInputProps('email')}
        />

        <PasswordInput
          mt={20}
          size="md"
          label="Password"
          placeholder="********"
          {...getInputProps('password')}
        />

        <Group mt={18} justify="space-between">
          <Checkbox
            styles={{ label: { fontSize: 14, paddingLeft: 8 } }}
            size="xs"
            label="Remember for 7 days"
            radius="sm"
            color="dracula"
            {...getInputProps('remember', { type: 'checkbox' })}
          />

          {/* <Button variant="transparent" color="dracula" size="xs" style={{ padding: 0 }}>
            Forgot Password
          </Button> */}
        </Group>

        <Button type="submit" fullWidth size="md" mt={28} color="dracula" loading={isLoading}>
          Sign In
        </Button>
      </Box>
    </Center>
  );
};
