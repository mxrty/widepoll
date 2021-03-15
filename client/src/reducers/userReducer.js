import produce from "immer";
import { FETCH_USER } from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case FETCH_USER:
      draft[action.payload.user_id] = action.payload;
      return;
    default:
      return;
  }
}, {});
