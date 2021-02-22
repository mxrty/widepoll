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
  CREATE_COMMENT,
  FETCH_COMMENTS,
} from "./types";

export const createComment = (formValues, postId) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/comments/${postId}`,
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

  console.log(response);
  dispatch({ type: CREATE_COMMENT, payload: response.data });
};

export const fetchComments = (postId) => async (dispatch) => {
  const response = await api.get(`/comments/${postId}`);
  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const likeComment = (commentId) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  console.log(commentId);
  const response = await api.post(
    `/comments/like/${commentId}`,
    {
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );

  //dispatch({ type: LIKE_COMMENT, payload: response.data });
};

export const unlikeComment = (commentId) => async (dispatch) => {
  const response = await api.post(`/comments/unlike/${commentId}`);
  //dispatch({ type: LIKE_COMMENT, payload: response.data });
};

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

export const createDomain = (formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/domains",
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
  dispatch({ type: CREATE_DOMAIN, payload: response.data });
  history.goBack();
};

export const fetchDomain = (domain) => async (dispatch) => {
  const response = await api.get(`/domains/${domain}`);
  dispatch({ type: FETCH_DOMAIN, payload: response.data });
};

export const editDomain = (domain, formValues) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.put(
    `/domains/${domain}`,
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
  dispatch({ type: EDIT_DOMAIN, payload: response.data });
};

export const deleteDomain = (domain) => async (dispatch) => {
  await api.delete(`/domains/${domain}`);
  dispatch({ type: DELETE_DOMAIN, payload: domain });
};
