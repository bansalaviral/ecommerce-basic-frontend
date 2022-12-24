import * as actionTypes from "../constants/userConstants.js";

export const setUser = (user) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SET_USER,
    payload: user,
  });

  if (getState().user.userDetails)
    localStorage.setItem("user", JSON.stringify(getState().user.userDetails));
  else localStorage.removeItem("user");
};
