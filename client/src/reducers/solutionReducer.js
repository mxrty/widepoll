import produce from "immer";
import {
  CREATE_SOLUTION,
  FETCH_SOLUTIONS,
  FETCH_SOLUTION,
  LIKE_SOLUTION,
  UNLIKE_SOLUTION,
} from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case CREATE_SOLUTION:
      if (!draft[action.payload.issue_id]) {
        draft[action.payload.issue_id] = {};
      }
      draft[action.payload.issue_id][action.payload.solution_id] =
        action.payload;
      return;
    case FETCH_SOLUTION:
      if (!draft[action.payload.issue_id]) {
        draft[action.payload.issue_id] = {};
      }
      draft[action.payload.issue_id][action.payload.solution_id] =
        action.payload;
      return;
    case FETCH_SOLUTIONS:
      if (!draft[action.payload[0].issue_id]) {
        draft[action.payload[0].issue_id] = {};
      }
      action.payload.forEach((solution) => {
        draft[solution.issue_id][solution.solution_id] = solution;
      });
      return;
    case LIKE_SOLUTION:
      draft[action.payload.issue_id][action.payload.solution_id].likes =
        action.payload.likes;
      return;
    case UNLIKE_SOLUTION:
      draft[action.payload.issue_id][action.payload.solution_id].likes =
        action.payload.likes;
      return;
    default:
      return;
  }
}, {});
