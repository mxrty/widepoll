import api from "../apis/api";
import {
  CREATE_COMMENT,
  FETCH_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
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

export const likeComment = (commentId, postId) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
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

  const payload = { ...response.data, postId };
  dispatch({ type: LIKE_COMMENT, payload: payload });
};

export const unlikeComment = (commentId) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/comments/unlike/${commentId}`,
    {
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: UNLIKE_COMMENT, payload: response.data });
};
