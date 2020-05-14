import { SET_USER } from './action-types';

const reducer = (state = {}, action) => {
  if (typeof action === 'undefined') {
    return state;
  }

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
