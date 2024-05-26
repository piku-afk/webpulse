import type { ModalsProviderProps } from '@mantine/modals';

import { SessionExpiredModal } from '#components/modals/SessionExpired';

export enum ModalIds {
  sessionExpired = 'session_expired',
}

export const modalConfig: ModalsProviderProps['modals'] = {
  [ModalIds.sessionExpired]: SessionExpiredModal,
};
