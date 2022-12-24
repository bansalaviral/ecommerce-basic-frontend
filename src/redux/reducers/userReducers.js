import * as actionTypes from "../constants/userConstants";

const USER_INITIAL_STATE = {
  userDetails: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      const user = action.payload;

      if (user)
        return {
          ...state,
          userDetails: user,
        };
      else {
        return {
          ...state,
          userDetails: null,
        };
      }

    default:
      return state;
  }
};
