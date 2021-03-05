import api from "../apis/api";
import history from "../history";
import { SIGN_IN, SIGN_OUT, REGISTER } from "./types";

export const signIn = (formValues) => async (dispatch) => {
  const response = await api.post("/auth/login", {
    ...formValues,
  });
  dispatch({ type: SIGN_IN, payload: response.data });
  history.push("/");
};

export const register = (formValues) => async (dispatch) => {
  const response = await api.post("/auth/register", {
    ...formValues,
  });
  dispatch({ type: REGISTER, payload: response.data });
  history.push("/");
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
