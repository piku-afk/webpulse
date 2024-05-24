import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { DefaultLoader } from './components/DefaultLoader';
import { modalConfig } from './constants/modals';
import { router } from './routes';
import { store } from './store';
import { theme } from './theme';

export const App = () => {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ModalsProvider modals={modalConfig}>
          <RouterProvider fallbackElement={<DefaultLoader />} router={router} />
          <Notifications position="top-center" limit={2} />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
};
