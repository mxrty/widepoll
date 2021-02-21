// import { REGISTER, SIGN_IN, SIGN_OUT } from "../actions/types";

// const INTIAL_STATE = {
//   isSignedIn: false,
//   user_id: null,
//   user_name: null,
//   user_email: null,
//   jwt_token: null,
// };

// export default (state = INTIAL_STATE, action) => {
//   const { user_id, user_name, user_email, jwt_token } = action.payload;
//   switch (action.type) {
//     case SIGN_IN:
//       return {
//         ...state,
//         isSignedIn: true,
//         user_id,
//         user_name,
//         user_email,
//         jwt_token,
//       };
//     case SIGN_OUT:
//       return {
//         ...state,
//         isSignedIn: false,
//         user_id: null,
//         user_name: null,
//         user_email: null,
//         jwt_token: null,
//       };
//     case REGISTER:
//       return {
//         ...state,
//         isSignedIn: true,
//         user_id,
//         user_name,
//         user_email,
//         jwt_token,
//       };
//     default:
//       return state;
//   }
// };

import { REGISTER, SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  user_id: null,
  user_name: null,
  user_email: null,
  jwt_token: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        user_email: action.payload.user_email,
        jwt_token: action.payload.jwt_token,
      };
    case SIGN_OUT:
      return {
        ...INITIAL_STATE,
      };
    case REGISTER:
      return {
        ...state,
        isSignedIn: true,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        user_email: action.payload.user_email,
        jwt_token: action.payload.jwt_token,
      };
    default:
      return state;
  }
};
