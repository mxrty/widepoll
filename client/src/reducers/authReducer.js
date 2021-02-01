import { REGISTER, SIGN_IN, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  user_id: null,
  jwt_token: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        user_id: action.payload.user_id,
        jwt_token: action.payload.jwt_token,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user_id: null, jwt_token: null };
    case REGISTER:
      return {
        ...state,
        isSignedIn: true,
        user_id: action.payload.user_id,
        jwt_token: action.payload.jwt_token,
      };
    default:
      return state;
  }
};
