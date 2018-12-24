const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdvertisementSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Advertisement = mongoose.model(
  "advertisements",
  AdvertisementSchema
);
