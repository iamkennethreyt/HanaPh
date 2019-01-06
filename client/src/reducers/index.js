import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import adsReducer from "./adsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ads: adsReducer
});
