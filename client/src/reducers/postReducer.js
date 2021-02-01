import _ from "lodash";
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload.post_id]: action.payload };
    case FETCH_POST:
      return { ...state, [action.payload.post_id]: action.payload };
    case FETCH_POSTS:
      return { ...state, ..._.mapKeys(action.payload, "post_id") };
    case EDIT_POST:
      return { ...state, [action.payload.post_id]: action.payload };
    case DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
