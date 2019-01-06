import { GET_ADS, POST_AD } from "../actions/types";

const initialState = {
  ads: []
  //   adv: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_AD:
      return {
        ...state,
        ads: [action.payload, ...state.ads]
      };
    case GET_ADS:
      return {
        ...state,
        ads: action.payload
      };

    default:
      return state;
  }
}
