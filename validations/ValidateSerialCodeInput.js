const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateSerialCodeInput(data) {
  let errors = {};

  data.serialcode = !isEmpty(data.serialcode) ? data.serialcode : "";

  if (!validator.isLength(data.serialcode, { min: 4, max: 40 })) {
    errors.serialcode = "Worker type must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.serialcode)) {
    errors.serialcode = "Serial code field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
