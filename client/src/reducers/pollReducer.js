import produce from "immer";
import { CREATE_POLL, FETCH_POLL } from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case CREATE_POLL:
      draft[action.payload.poll_id] = action.payload;
      return;
    case FETCH_POLL:
      draft[action.payload.poll_id] = action.payload;
      return;
    default:
      return;
  }
}, {});
