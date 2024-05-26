import { notifications } from '@mantine/notifications';
import { X } from 'lucide-react';

interface NotifyParams {
  title?: string;
  message?: string;
}

export const notifyError = (params: NotifyParams): void => {
  const { message, title = 'Error' } = params;

  notifications.show({
    title,
    message,
    withBorder: true,
    color: 'red',
    icon: <X />,
  });
};
