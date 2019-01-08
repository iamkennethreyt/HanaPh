const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.contactInfo = !isEmpty(data.contactInfo) ? data.contactInfo : "";
  data.cityProvince = !isEmpty(data.cityProvince) ? data.cityProvince : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.type)) {
    errors.type = "Type info field is required";
  }

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "password must match";
  }

  if (!validator.isLength(data.password2, { min: 4, max: 40 })) {
    errors.password2 = "Confirm Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.isLength(data.password, { min: 4, max: 40 })) {
    errors.password = "Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.cityProvince, { min: 4, max: 40 })) {
    errors.cityProvince = "City province must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.cityProvince)) {
    errors.cityProvince = "City province field is required";
  }

  if (!validator.isLength(data.contactInfo, { min: 4, max: 40 })) {
    errors.contactInfo = "Contact info must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.contactInfo)) {
    errors.contactInfo = "Contact info field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!validator.isLength(data.email, { min: 4, max: 40 })) {
    errors.email = "Email must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
