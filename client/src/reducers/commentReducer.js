import _ from "lodash";
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
      if (!parent.children) {
        parent.children = [];
      }
      if (comment.comment_type === "REPLY") {
        //check if exists
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
      //init children and add if required
      return;
    case FETCH_COMMENTS:
      const postId = draft[action.payload[0].post_id];
      if (!draft[postId]) {
        draft[postId] = {};
      }
      action.payload.forEach((comment) => {
        draft[comment.post_id][comment.comment_id] = comment;
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
  }
}, {});
