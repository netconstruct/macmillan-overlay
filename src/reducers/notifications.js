import { NOTIFICATIONS } from 'actions';

const defaultState = {
  current: null,
  isProcessing: false,
};

const entities = (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFICATIONS.SHOW.REQUEST:
      return {
        ...state,
        isProcessing: true,
      };
    case NOTIFICATIONS.SHOW.SUCCESS: {
      const { current } = action.payload;
      return {
        ...state,
        isProcessing: false,
        current,
      };
    }
    case NOTIFICATIONS.SHOW.ERROR:
      return {
        ...state,
        isProcessing: false,
      };
    default:
      return state;
  }
};

export default entities;
