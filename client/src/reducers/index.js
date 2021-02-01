import { combineReducers } from "redux";
import domainReducer from "./domainReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";

export default combineReducers({
  posts: postReducer,
  domains: domainReducer,
  auth: authReducer,
});
