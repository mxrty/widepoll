import api from "../apis/api";
import { FETCH_PENDING_VOTES, DELETE_PENDING_VOTE } from "./types";

export const fetchPendingVotes = () => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/votes/pending",
    {
      user_id: user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: FETCH_PENDING_VOTES, payload: response.data });
};

export const removePendingVote = (entity, entityId) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/votes/${entityId}`,
    {
      user_id: user_id,
      entity,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: DELETE_PENDING_VOTE, payload: response.data });
};
