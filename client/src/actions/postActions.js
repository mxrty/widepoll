import api from "../apis/api";
import history from "../history";
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
} from "./types";

export const createPost = (formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/posts",
    {
      ...formValues,
      user_id,
    },
    {
      headers: {
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

export const fetchLatestPosts = (number) => async (dispatch) => {
  const response = await api.get(`/posts/latest/${number}`);
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = (id) => async (dispatch) => {
  const response = await api.get(`/posts/${id}`);
  dispatch({ type: FETCH_POST, payload: response.data });
};

export const editPost = (id, formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.patch(
    `/posts/${id}`,
    {
      ...formValues,
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: EDIT_POST, payload: response.data });
};

export const deletePost = (id) => async (dispatch) => {
  await api.delete(`/posts/${id}`);
  dispatch({ type: DELETE_POST, payload: id });
};

export const likePost = (postId) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/posts/like/${postId}`,
    {
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );

  if (response.status === 200) {
    dispatch({ type: LIKE_POST, payload: response.data });
  }
};

export const unlikePost = (postId) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/posts/unlike/${postId}`,
    {
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  if (response.status === 200) {
    const payload = { ...response.data, post_id: postId };
    dispatch({ type: UNLIKE_POST, payload: payload });
  }
};
