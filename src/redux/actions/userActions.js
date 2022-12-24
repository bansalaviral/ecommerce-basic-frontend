import * as actionTypes from "../constants/userConstants.js";

export const setUser = (user) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SET_USER,
    payload: user,
  });

  localStorage.setItem("user", JSON.stringify(getState().user.userDetails));
  localStorage.setItem(
    "token",
    JSON.stringify(getState().user.userDetails.token)
  );
};
