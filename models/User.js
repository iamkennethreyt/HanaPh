const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  cityProvince: {
    type: String,
    required: true
  },
  completeAddress: {
    type: String
  },
  details: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  resume: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
