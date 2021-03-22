import api from "../apis/api";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
  BECOME_REP,
  FETCH_USER,
  FOLLOW_REP,
} from "./types";

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

export const signOut = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload: "Signed out",
  });
};

export const becomeRep = (domain) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/reps",
    {
      user_id,
      domain,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: BECOME_REP, payload: response.data });
};

export const followRep = (repId, optIn) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/reps/follow",
    {
      user_id,
      rep_id: repId,
      optIn,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: FOLLOW_REP, payload: response.data });
};

export const fetchUser = (userId) => async (dispatch) => {
  const response = await api.get(`/users/${userId}`);
  dispatch({ type: FETCH_USER, payload: response.data });
};
