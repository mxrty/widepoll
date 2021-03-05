import _ from "lodash";
import produce from "immer";
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS,
  EDIT_POST,
  DELETE_POST,
  CREATE_COMMENT,
  FETCH_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  CREATE_SOLUTION,
  FETCH_SOLUTIONS,
} from "../actions/types";

const assignChildren = (comments) => {
  for (let [key, comment] of Object.entries(comments)) {
    const parent = comments[comment.parent_id];
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
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
    case CREATE_POST:
      draft[action.payload.post_id] = action.payload;
      return;
    case FETCH_POST:
      draft[action.payload.post_id] = action.payload;
      if (draft[action.payload.post_id].post_type === "ISSUE") {
        draft[action.payload.post_id].solutions = {};
      }
      return;
    case FETCH_POSTS:
      action.payload.forEach((post) => {
        draft[post.post_id] = post;
        draft[post.post_id].comments = {};
        if (draft[post.post_id].post_type === "ISSUE") {
          draft[post.post_id].solutions = {};
        }
      });
      return;
    case EDIT_POST:
      draft[action.payload.post_id] = action.payload;
      return;
    case DELETE_POST:
      delete draft[action.payload.post_id];
      return;
    case CREATE_COMMENT:
      if (draft[action.payload.post_id]) {
        if (!draft[action.payload.post_id].comments) {
          draft[action.payload.post_id].comments = action.payload;
        } else {
          draft[action.payload.post_id].comments[action.payload.comment_id] =
            action.payload;
        }
      }
      return;
    case FETCH_COMMENTS:
      action.payload.forEach((comment) => {
        if (comment.post_id && comment.comment_id) {
          draft[comment.post_id].comments[comment.comment_id] = comment;
        }
      });
      assignChildren(draft[action.payload[0].post_id].comments);
      return;
    case LIKE_COMMENT:
      if (
        draft[action.payload.post_id] &&
        draft[action.payload.post_id].comments[action.payload.comment_id].likes
      ) {
        draft[action.payload.post_id].comments[
          action.payload.comment_id
        ].likes =
          draft[action.payload.post_id].comments[action.payload.comment_id]
            .likes + 1;
      }
      return;
    case UNLIKE_COMMENT:
      if (
        draft[action.payload.post_id] &&
        draft[action.payload.post_id].comments[action.payload.comment_id].likes
      ) {
        draft[action.payload.post_id].comments[
          action.payload.comment_id
        ].likes =
          draft[action.payload.post_id].comments[action.payload.comment_id]
            .likes - 1;
      }
      return;
    case CREATE_SOLUTION:
      if (
        draft[action.payload.issue_id] &&
        draft[action.payload.issue_id].solutions[action.payload.solution_id]
      ) {
        draft[action.payload.issue_id].solutions[action.payload.solution_id] =
          action.payload;
      }
      return;
    case FETCH_SOLUTIONS:
      action.payload.forEach((solution) => {
        if (solution.issue_id && solution.solution_id) {
          draft[solution.issue_id].solutions[solution.solution_id] = solution;
        }
      });
      return;
  }
}, {});
