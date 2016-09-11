import { NOTIFICATION_KEY } from 'middleware/notifications';

export const NOTIFICATIONS = {
  SHOW: {
    REQUEST: 'notifications.show.request',
    SUCCESS: 'notifications.show.success',
    ERROR: 'notifications.show.error',
  },
};

export const showNotification = () => ({
  [NOTIFICATION_KEY]: {
    types: [NOTIFICATIONS.SHOW.REQUEST, NOTIFICATIONS.SHOW.SUCCESS, NOTIFICATIONS.SHOW.ERROR],
  },
});
