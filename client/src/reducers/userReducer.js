// GET_CURRENT_USER

import { GET_CURRENT_USER, GET_USER } from "../actions/types";

const initialState = {
  currentUser: {},
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
