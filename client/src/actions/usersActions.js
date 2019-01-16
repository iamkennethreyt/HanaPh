import axios from "axios";

import { GET_CURRENT_USER, GET_ERRORS, GET_USER } from "./types";

//get current user
export const getCurrentUser = () => dispatch => {
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//update current user
export const updateCurrentUser = (data, history) => dispatch => {
  axios
    .put("/api/users/accountsettings", data)
    .then(() => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//update password
export const updatePassword = (data, history) => dispatch => {
  axios
    .put("/api/users/accountsettings/password", data)
    .then(() => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getUser = id => dispatch => {
  axios
    .get(`/api/users/profile/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
