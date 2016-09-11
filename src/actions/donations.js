import { API_KEY } from 'middleware/justgiving';

export const DONATIONS = {
  FETCH: {
    REQUEST: 'donations.fetch.request',
    SUCCESS: 'donations.fetch.success',
    ERROR: 'donations.fetch.error',
  },
};

export const fetchDonations = () => ({
  [API_KEY]: {
    endpoint: `/fundraising/pages/${process.env.JUSTGIVING_PAGESHORTNAME}/donations`,
    types: [DONATIONS.FETCH.REQUEST, DONATIONS.FETCH.SUCCESS, DONATIONS.FETCH.ERROR],
  },
});
