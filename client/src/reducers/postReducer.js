import _ from "lodash";
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

const assignChildren = (commentsArr) => {
  const comments = _.mapKeys(commentsArr, "comment_id");
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
  return comments;
};

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
    case CREATE_COMMENT:
      return {
        ...state,
        [action.payload.post_id]: {
          ...state[action.payload.post_id],
          comments: {
            ...state[action.payload.post_id].comments,
            [action.payload.comment_id]: { ...action.payload, children: [] },
            [action.payload.parent_id]: {
              ...state[action.payload.post_id].comments[
                action.payload.parent_id
              ],
              children: [
                ...state[action.payload.post_id].comments[
                  action.payload.parent_id
                ].children,
                action.payload.comment_id,
              ],
            },
          },
        },
      };
    case FETCH_COMMENTS:
      if (action.payload.rows[0]) {
        return {
          ...state,
          [action.payload.rows[0].post_id]: {
            ...state[action.payload.rows[0].post_id],
            comments: assignChildren(action.payload.rows),
          },
        };
      }
      return state;
    case LIKE_COMMENT:
      // return {
      //   ...state,
      //   [action.payload.postId]: {
      //     ...state[action.payload.postId],
      //     comments: {
      //       ...state[action.payload.postId].comments,
      //       [action.payload.comment_id]: {
      //         ...state[action.payload.postId].comments[
      //           action.payload.comment_id
      //         ],
      //         likes: 5,
      //       },
      //     },
      //   },
      // };
      break;
    case UNLIKE_COMMENT:
      break;
    case CREATE_SOLUTION:
      if (state[action.payload.issue_id].solutions) {
      } else {
        return {
          ...state,
          [action.payload.issue_id]: {
            ...state[action.payload.issue_id],
            solutions: {
              [action.payload.solution_id]: action.payload,
            },
          },
        };
      }
    case FETCH_SOLUTIONS:
      console.log({
        ...state,
        [action.payload[0].issue_id]: {
          ...state[action.payload[0].issue_id],
          solutions: {
            ...state[action.payload[0].issue_id].solutions,
            ..._.mapKeys(action.payload, "solution_id"),
          },
        },
      });
      // if (action.payload) {
      //   return {
      //     ...state,
      //     [action.payload[0].issue_id]: {
      //       ...state[action.payload[0].issue_id],
      //       solutions: {
      //         ...state[action.payload[0].issue_id].solutions,
      //         ..._.mapKeys(action.payload, "solution_id"),
      //       },
      //     },
      //   };
      // }
      return state;
    default:
      return state;
  }
};
