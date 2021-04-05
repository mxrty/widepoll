import { combineReducers } from "redux";
import domainReducer from "./domainReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import commentReducer from "./commentReducer";
import solutionReducer from "./solutionReducer";
import pollReducer from "./pollReducer";
import userReducer from "./userReducer";
import sentimentReducer from "./sentimentReducer";

export default combineReducers({
  auth: authReducer,
  comments: commentReducer,
  domains: domainReducer,
  polls: pollReducer,
  posts: postReducer,
  solutions: solutionReducer,
  users: userReducer,
  sentiments: sentimentReducer,
});
