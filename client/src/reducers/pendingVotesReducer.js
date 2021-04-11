import produce from "immer";
import { DELETE_PENDING_VOTE, FETCH_PENDING_VOTES } from "../actions/types";
import _ from "lodash";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case FETCH_PENDING_VOTES:
      if (!action.payload[0]) {
        return;
      }
      draft[action.payload[0].follower_id] = action.payload;
      return;
    case DELETE_PENDING_VOTE:
      _.remove(draft[action.payload.follower_id], {
        entity: action.payload.entity,
        entity_id: action.payload.entity_id,
      });
      return;
    default:
      return;
  }
}, {});
