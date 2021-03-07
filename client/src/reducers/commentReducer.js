import produce from "immer";
import {
  CREATE_COMMENT,
  FETCH_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "../actions/types";

const assignChildren = (comments) => {
  for (let [key, comment] of Object.entries(comments)) {
    const parent = comments[comment.parent_id];
    if (parent) {
      if (comment.comment_type === "REPLY") {
        parent.children.push(comment.comment_id);
      }
    }
  }
};

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case CREATE_COMMENT:
      if (!draft[action.payload.post_id]) {
        draft[action.payload.post_id] = {};
      }
      draft[action.payload.post_id][action.payload.comment_id] = action.payload;
      draft[action.payload.post_id][action.payload.comment_id].children = [];
      if (action.payload.comment_type === "REPLY") {
        draft[action.payload.post_id][action.payload.parent_id].children.push(
          action.payload.comment_id
        );
      }
      return;
    case FETCH_COMMENTS:
      if (!action.payload[0]) {
        return;
      }
      const postId = action.payload[0].post_id;
      if (!draft[postId]) {
        draft[postId] = {};
      }
      action.payload.forEach((comment) => {
        draft[postId][comment.comment_id] = comment;
        draft[postId][comment.comment_id].children = [];
      });
      assignChildren(draft[postId]);
      return;
    case LIKE_COMMENT:
      draft[action.payload.post_id][action.payload.comment_id].likes =
        draft[action.payload.post_id][action.payload.comment_id].likes + 1;
      return;
    case UNLIKE_COMMENT:
      draft[action.payload.post_id][action.payload.comment_id].likes =
        draft[action.payload.post_id][action.payload.comment_id].likes - 1;
      return;
    default:
      return;
  }
}, {});
