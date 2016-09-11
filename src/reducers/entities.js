import { DONATIONS } from 'actions';

const defaultState = {
  isFetching: false,
  donations: [],
};

const entities = (state = defaultState, action) => {
  switch (action.type) {
    case DONATIONS.FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DONATIONS.FETCH.SUCCESS:
      return {
        ...state,
        donations: [
          ...action.res.donations,
        ],
        isFetching: false,
      };
    case DONATIONS.FETCH.ERROR:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default entities;
