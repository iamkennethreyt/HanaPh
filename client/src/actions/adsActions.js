import axios from "axios";

import { GET_ERRORS, GET_ADS, GET_AD, POST_AD, DELETE_AD } from "./types";

//Register Employer
export const postAd = (adsdata, history, onSuccess) => dispatch => {
  axios
    .post("/api/advertisements", adsdata)
    .then(res => {
      dispatch({
        type: POST_AD,
        payload: res.data
      });
    })
    .then(() => {
      history.push("/");
      onSuccess();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAds = () => dispatch => {
  axios
    .get("/api/advertisements")
    .then(res =>
      dispatch({
        type: GET_ADS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADS,
        payload: null
      })
    );
};

export const getAd = id => dispatch => {
  axios
    .get(`/api/advertisements/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_AD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_AD,
        payload: null
      })
    );
};

export const updateAdd = (data, history) => dispatch => {
  axios
    .put(`/api/advertisements/edit/${data._id}`, data)
    .then(() => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_AD,
        payload: null
      })
    );
};

export const deleteAd = id => dispatch => {
  axios
    .delete(`/api/advertisements/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_AD,
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

export const submitApplication = id => dispatch => {
  // console.log(id);
  // const myid = "5c807699827cb134a44a15b4";
  axios.post(`/api/advertisements/submitapplication/${id}`).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
