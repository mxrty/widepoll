import api from "../apis/api";
import history from "../history";
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
  CREATE_DOMAIN,
  FETCH_DOMAIN,
  EDIT_DOMAIN,
  DELETE_DOMAIN,
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
} from "./types";

export const signIn = (formValues) => async (dispatch) => {
  const response = await api.post("/auth/login", {
    ...formValues,
  });
  dispatch({ type: SIGN_IN, payload: response.data });
  history.push("/");
};

export const register = (formValues) => async (dispatch) => {
  console.log(formValues);
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

export const createPost = (formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/posts",
    {
      ...formValues,
      user_id,
    },
    {
      header: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: CREATE_POST, payload: response.data });
  history.goBack();
};

export const fetchPosts = () => async (dispatch) => {
  const response = await api.get("/posts");
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = (id) => async (dispatch) => {
  const response = await api.get(`/posts/${id}`);
  dispatch({ type: FETCH_POST, payload: response.data });
};

export const editPost = (id, formValues) => async (dispatch) => {
  const response = await api.patch(`/posts/${id}`, formValues);
  dispatch({ type: EDIT_POST, payload: response.data });
};

export const deletePost = (id) => async (dispatch) => {
  await api.delete(`/posts/${id}`);
  dispatch({ type: DELETE_POST, payload: id });
};

export const createDomain = (formValues) => async (dispatch, getState) => {
  const response = await api.post("/domains", {
    ...formValues,
  });
  dispatch({ type: CREATE_DOMAIN, payload: response.data });
  history.goBack();
};

export const fetchDomain = (domain) => async (dispatch) => {
  const response = await api.get(`/domains/${domain}`);
  dispatch({ type: FETCH_DOMAIN, payload: response.data });
};

export const editDomain = (domain, formValues) => async (dispatch) => {
  const response = await api.put(`/domains/${domain}`, formValues);
  dispatch({ type: EDIT_DOMAIN, payload: response.data });
};

export const deleteDomain = (domain) => async (dispatch) => {
  await api.delete(`/domains/${domain}`);
  dispatch({ type: DELETE_DOMAIN, payload: domain });
};
