import produce from "immer";
import { REGISTER, SIGN_IN, SIGN_OUT, BECOME_REP } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  isRep: false,
  user_id: null,
  user_name: null,
  user_email: null,
  jwt_token: null,
};

export default produce((draft, action = {}) => {
  if (!action.payload) {
    return;
  }
  switch (action.type) {
    case SIGN_IN:
      draft.isSignedIn = true;
      draft.user_id = action.payload.user_id;
      draft.user_name = action.payload.user_name;
      draft.user_email = action.payload.user_email;
      draft.jwt_token = action.payload.jwt_token;
      draft.isRep = action.payload.isRep;
      return;
    case SIGN_OUT:
      return INITIAL_STATE;
    case REGISTER:
      draft.isSignedIn = true;
      draft.user_id = action.payload.user_id;
      draft.user_name = action.payload.user_name;
      draft.user_email = action.payload.user_email;
      draft.jwt_token = action.payload.jwt_token;
      draft.isRep = action.payload.isRep;
      return;
    case BECOME_REP:
      draft.isRep = action.payload;
      return;
    default:
      return;
  }
}, INITIAL_STATE);
