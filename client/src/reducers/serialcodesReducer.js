import {
  ADD_SERIALCODE,
  GET_SERIALCODES,
  DELETE_SERIALCODE
} from "../actions/types";

const initialState = {
  serialcodes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SERIALCODE:
      return {
        ...state,
        serialcodes: [action.payload, ...state.serialcodes]
      };
    case GET_SERIALCODES:
      return {
        ...state,
        serialcodes: action.payload
      };
    case DELETE_SERIALCODE:
      return {
        ...state,
        serialcodes: state.serialcodes.filter(
          wt => wt._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
