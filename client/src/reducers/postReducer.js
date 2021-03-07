import produce from "immer";
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
} from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case CREATE_POST:
      draft[action.payload.post_id] = action.payload;
      return;
    case FETCH_POST:
      draft[action.payload.post_id] = action.payload;
      return;
    case FETCH_POSTS:
      action.payload.forEach((post) => {
        draft[post.post_id] = post;
      });
      return;
    case EDIT_POST:
      draft[action.payload.post_id] = action.payload;
      return;
    case DELETE_POST:
      delete draft[action.payload.post_id];
      return;
    case LIKE_POST:
      draft[action.payload.post_id].likes =
        draft[action.payload.post_id].likes + 1;
      return;
    case UNLIKE_POST:
      draft[action.payload.post_id].likes =
        draft[action.payload.post_id].likes - 1;
      return;
    default:
      return;
  }
}, {});
