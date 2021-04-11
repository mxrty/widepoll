import produce from "immer";
import { FETCH_USER, UPDATE_REP_RANKING } from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case FETCH_USER:
      draft[action.payload.user_id] = action.payload;
      return;
    case UPDATE_REP_RANKING:
      console.log(action.payload);
      if (action.payload.updatedRepRanking) {
        draft[action.payload.user_id].following =
          action.payload.updatedRepRanking;
      }
      return;
    default:
      return;
  }
}, {});
