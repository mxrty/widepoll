import produce from "immer";
import {
  CREATE_DOMAIN,
  FETCH_DOMAIN,
  EDIT_DOMAIN,
  DELETE_DOMAIN,
  FETCH_DOMAINS,
} from "../actions/types";

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case CREATE_DOMAIN:
      draft[action.payload.domain_name] = action.payload;
      return;
    case FETCH_DOMAIN:
      draft[action.payload.domain_name] = action.payload;
      return;
    case FETCH_DOMAINS:
      action.payload.forEach((domain) => {
        draft[domain.domain_name] = domain;
      });
      return;
    case EDIT_DOMAIN:
      draft[action.payload.domain_name] = action.payload;
      return;
    case DELETE_DOMAIN:
      delete draft[action.payload.domain_name];
      return;
    default:
      return;
  }
}, {});
