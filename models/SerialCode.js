const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const SerialCodeSchema = new Schema({
  serialcode: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SerialCode = mongoose.model("serialcodes", SerialCodeSchema);
