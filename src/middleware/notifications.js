export const NOTIFICATION_KEY = Symbol('Notification');

/** Create new action from base action and given data. */
function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[NOTIFICATION_KEY];
  return finalAction;
}

/** Get next donation. */
function getNextDonation(currentNotification, donations) {
  return new Promise((resolve, reject) => {
    let donation = null;

    if (currentNotification && currentNotification.id) {
      const lastIndex = donations.findIndex(o => o.id === currentNotification.id);
      donation = donations[lastIndex - 1];
    } else {
      donation = donations[donations.length - 1];
    }

    setTimeout(() => {
      if (donation) {
        return resolve(donation);
      }
      return reject();
    }, 100);
  });
}

/** Create notification from donation. */
function createNotification(donation) {
  const amount = parseFloat(donation.amount);
  const subtitle = getSubTitle(amount, donation.currencyCode);

  return {
    id: donation.id,
    message: donation.message,
    subtitle,
    title: donation.donorDisplayName,
  };
}

function getSubTitle(amount, currencyCode) {
  switch (currencyCode) {
    case 'EUR':
      return String.fromCharCode(8364) + amount.toFixed(2);
    case 'GBP':
      return String.fromCharCode(163) + amount.toFixed(2);
    case 'USD':
      return String.fromCharCode(36) + amount.toFixed(2);
    default:
      return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

// eslint-disable-next-line no-unused-vars
const middleware = store => next => action => {
  const notificationPayload = action[NOTIFICATION_KEY];

  if (typeof notificationPayload === 'undefined') {
    return next(action);
  }

  const { types } = notificationPayload;
  const [requestType, successType, failureType] = types;

  const { entities, notifications } = store.getState();
  const { donations } = entities;

  next(actionWith(action, { type: requestType }));

  // Get next donation.
  return getNextDonation(notifications.current, donations).then(
    donation => next(actionWith({
      type: successType,
      payload: {
        current: createNotification(donation),
      },
    })),
    () => next(actionWith({
      type: failureType,
    }))
  );
};

export default middleware;
