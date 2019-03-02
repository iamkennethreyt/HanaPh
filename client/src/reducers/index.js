import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import adsReducer from "./adsReducer";
import usersReducer from "./userReducer";
import serialcodesReducer from "./serialcodesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ads: adsReducer,
  users: usersReducer,
  serialcodes: serialcodesReducer
});
