const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateAdvertismentInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.details = !isEmpty(data.details) ? data.details : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (validator.isEmpty(data.details)) {
    errors.details = "Details field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
