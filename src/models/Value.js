const mongoose = require("mongoose");

const ValueSchema = new mongoose.Schema({
  val1: Number,
  val2: Number
});

module.exports = mongoose.model("Value", ValueSchema);
