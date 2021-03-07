import api from "../apis/api";
import history from "../history";
import {
  CREATE_SOLUTION,
  FETCH_SOLUTIONS,
  LIKE_SOLUTION,
  UNLIKE_SOLUTION,
} from "./types";

export const createSolution = (formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/solutions",
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

  dispatch({ type: CREATE_SOLUTION, payload: response.data });
  history.goBack();
};

export const fetchSolutions = (postId) => async (dispatch) => {
  const response = await api.get(`/solutions/${postId}`);
  dispatch({ type: FETCH_SOLUTIONS, payload: response.data });
};

export const likeSolution = (issueId, solutionId) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/solutions/like/${solutionId}`,
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
    const payload = {
      ...response.data,
      issue_id: issueId,
      solution_id: solutionId,
    };
    dispatch({ type: LIKE_SOLUTION, payload: payload });
  }
};

export const unlikeSolution = (issueId, solutionId) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    `/solutions/unlike/${solutionId}`,
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
    const payload = {
      ...response.data,
      issue_id: issueId,
      solution_id: solutionId,
    };
    dispatch({ type: UNLIKE_SOLUTION, payload: payload });
  }
};
