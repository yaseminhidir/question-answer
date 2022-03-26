import initialState from "../reducers/initialState";
import * as actionTypes from "./actionTypes";
import axios from "axios";

export function authSuccess(user) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: user,
  };
}

export function authError(error) {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
}
export function register(req) {
  return async function (dispatch) {
    try {
      var res = await axios.post(
        "http://localhost:5000/api/auth/register",
        req
      );
      console.log(res.data);
      dispatch(authSuccess(res.data.data));
      dispatch(authError(null));
    } catch (error) {
      initialState.error = error.response.data.message;
    }
  };
}
export function login(req) {
  return async function (dispatch) {
    try {
      var res = await axios.post(
        "http://localhost:5000/api/auth/login",
        req
      );
      console.log(res.data);
      dispatch(authSuccess(res.data.data));
      dispatch(authError(null));
    } catch (error) {
      initialState.error = error.response.data.message;
    }
  };
}