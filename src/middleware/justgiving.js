import 'isomorphic-fetch';

export const API_KEY = Symbol('Just Giving API');

/** Create new action from base action and given data. */
function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[API_KEY];
  return finalAction;
}

/** Query JustGiving API with given endpoint. */
function callApi(endpoint) {
  // Sanitize the endpoint and construct API url.
  const url = getApiUrl(endpoint);
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  // Query JustGiving API with given endpoint.
  return fetch(url, config)
    // Get JSON from response.
    .then(res => res.json().then(json => ({ json, res })))
    // Check response and handle error codes.
    .then(({ json, res }) => {
      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

/** Sanitize the endpoint and construct API url. */
function getApiUrl(endpoint) {
  let trimmed = endpoint;
  if (trimmed.startsWith('/')) {
    trimmed = trimmed.slice(1);
  }

  if (process.env.NODE_ENV === 'development') {
    return '/data/donations.json';
  }

  return `https://api.justgiving.com/${process.env.JUSTGIVING_APPID}/v1/${trimmed}`;
}

// eslint-disable-next-line no-unused-vars
const middleware = store => next => action => {
  const apiPayload = action[API_KEY];

  if (typeof apiPayload === 'undefined') {
    return next(action);
  }

  const { endpoint, types } = apiPayload;

  const [requestType, successType, failureType] = types;
  next(actionWith(action, { type: requestType }));

  return callApi(endpoint).then(
    res => next(actionWith({
      res,
      type: successType,
    })),
    error => next(actionWith({
      error,
      type: failureType,
    }))
  );
};

export default middleware;
