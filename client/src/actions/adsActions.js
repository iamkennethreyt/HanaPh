import axios from "axios";

import { GET_ERRORS, GET_ADS, POST_AD } from "./types";

//Register Employer
export const postAd = (adsdata, history) => dispatch => {
  axios
    .post("/api/advertisements", adsdata)
    .then(res => {
      dispatch({
        type: POST_AD,
        payload: res.data
      });
    })
    .then(() => history.push("/"))
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
