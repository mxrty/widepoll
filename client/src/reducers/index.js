import { combineReducers } from "redux";
import domainReducer from "./domainReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import commentReducer from "./commentReducer";
import solutionReducer from "./solutionReducer";

export default combineReducers({
  posts: postReducer,
  domains: domainReducer,
  auth: authReducer,
  comments: commentReducer,
  solutions: solutionReducer,
});
