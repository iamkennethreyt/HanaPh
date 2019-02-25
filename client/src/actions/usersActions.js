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
export const updateCurrentUser = (data, onSuccess) => dispatch => {
  axios
    .put("/api/users/accountsettings", data)
    .then(() => {
      onSuccess();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//update password
export const updatePassword = (data, history, onSuccess) => dispatch => {
  axios
    .put("/api/users/accountsettings/password", data)
    .then(() => onSuccess())
    .then(() => history.push("/settings"))
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

export const downloadResume = (id, name) => dispatch => {
  axios({
    url: `/api/users/download/${id}`,
    method: "GET",
    responseType: "blob" // important
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {
      console.log(err.response.data);
    });
};
