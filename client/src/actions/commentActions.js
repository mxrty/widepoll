import api from "../apis/api";
import {
  CREATE_COMMENT,
  CREATE_SENTIMENT,
  FETCH_COMMENTS,
  FETCH_SENTIMENTS,
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

  const payload = { ...response.data, postId, commentId };
  dispatch({ type: LIKE_COMMENT, payload: payload });
};

export const unlikeComment = (commentId, postId) => async (
  dispatch,
  getState
) => {
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
  const payload = { ...response.data, postId, commentId };
  dispatch({ type: UNLIKE_COMMENT, payload: payload });
};

export const createSentiment = (postId, commentId, sentiment) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/comments/sentiment/${commentId}`,
    {
      user_id,
      sentiment,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  const payload = { ...response.data, commentId, postId };
  dispatch({ type: CREATE_SENTIMENT, payload: payload });
};

export const fetchSentiments = (postId) => async (dispatch) => {
  const response = await api.get(`/comments/sentiment/${postId}`);
  dispatch({ type: FETCH_SENTIMENTS, payload: response.data });
};
