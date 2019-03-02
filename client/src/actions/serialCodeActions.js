import axios from "axios";

import {
  GET_ERRORS,
  ADD_SERIALCODE,
  GET_SERIALCODES,
  DELETE_SERIALCODE
} from "./types";

// Add worker type
export const addSerialCode = userData => dispatch => {
  axios
    .post("/api/serialcodes", userData)
    .then(res => {
      dispatch({
        type: ADD_SERIALCODE,
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

// show all get worker
export const getSerialCodes = () => dispatch => {
  axios
    .get("/api/serialcodes")
    .then(res => {
      dispatch({
        type: GET_SERIALCODES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

// delete single worker type
export const deleteSerialCode = id => dispatch => {
  axios
    .delete(`/api/serialcodes/${id}`, id)
    .then(res => {
      dispatch({
        type: DELETE_SERIALCODE,
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
