import _ from "lodash";
import {
  CREATE_DOMAIN,
  FETCH_DOMAIN,
  EDIT_DOMAIN,
  DELETE_DOMAIN,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_DOMAIN:
      return { ...state, [action.payload.domain_name]: action.payload };
    case FETCH_DOMAIN:
      return { ...state, [action.payload.domain_name]: action.payload };
    case EDIT_DOMAIN:
      return { ...state, [action.payload.domain_name]: action.payload };
    case DELETE_DOMAIN:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
