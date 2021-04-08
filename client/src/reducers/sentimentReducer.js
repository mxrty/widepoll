import produce from "immer";
import { CREATE_SENTIMENT, FETCH_SENTIMENTS } from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case CREATE_SENTIMENT:
      if (!draft[action.payload.post_id]) {
        draft[action.payload.post_id] = {};
      }
      if (!draft[action.payload.post_id][action.payload.comment_id]) {
        draft[action.payload.post_id][action.payload.comment_id] = [];
      }
      draft[action.payload.post_id][action.payload.comment_id].push(
        action.payload.sentiment
      );
      return;
    case FETCH_SENTIMENTS:
      const postId = action.payload[0].post_id;
      if (!draft[postId]) {
        draft[postId] = {};
      }
      action.payload.forEach((sentiment) => {
        if (!draft[postId][sentiment.comment_id]) {
          draft[postId][sentiment.comment_id] = [];
        }
        draft[postId][sentiment.comment_id].push(sentiment.sentiment);
      });
      return;
    default:
      return;
  }
}, {});
