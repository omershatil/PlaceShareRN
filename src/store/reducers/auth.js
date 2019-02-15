import {TRY_AUTH} from '../actions/actionTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TRY_AUTH:
      return {
        ...state,
      };
    default:
      return state;
  }
};
