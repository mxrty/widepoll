import api from "../apis/api";
import history from "../history";
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
} from "./types";

export const createPost = (formValues) => async (dispatch, getState) => {
  // Do server side
  // var currentDate = new Date();
  // var dateString =
  //   currentDate.getUTCFullYear() +
  //   "/" +
  //   ("0" + (currentDate.getUTCMonth() + 1)).slice(-2) +
  //   "/" +
  //   ("0" + currentDate.getUTCDate()).slice(-2) +
  //   " " +
  //   ("0" + currentDate.getUTCHours()).slice(-2) +
  //   ":" +
  //   ("0" + currentDate.getUTCMinutes()).slice(-2) +
  //   ":" +
  //   ("0" + currentDate.getUTCSeconds()).slice(-2);

  //const { userId } = getState().auth;
  const response = await api.post("/posts", {
    ...formValues,
    //createdAt: dateString,
    //, userId
  });
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
