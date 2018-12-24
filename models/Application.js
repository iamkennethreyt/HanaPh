const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  advertisement: {
    type: Schema.Types.ObjectId,
    ref: "advertisements"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Application = mongoose.model(
  "applications",
  ApplicationSchema
);
