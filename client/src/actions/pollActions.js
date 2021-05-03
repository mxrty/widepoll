import api from "../apis/api";
import history from "../history";
import { CREATE_POLL, FETCH_POLL } from "./types";

export const createPoll = (formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/polls",
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

  dispatch({ type: CREATE_POLL, payload: response.data });
  history.push(`/polls/show/${response.data.poll_id}`);
};

export const fetchPoll = (id) => async (dispatch) => {
  const response = await api.get(`/polls/${id}`);
  dispatch({ type: FETCH_POLL, payload: response.data });
};

export const votePoll = (optionId, pollId) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/polls/vote",
    {
      optionId,
      pollId,
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );

  history.push(`/polls/${response.data.poll_id}/results`);
};
