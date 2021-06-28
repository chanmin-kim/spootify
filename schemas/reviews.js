const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  created: {
    type:Date,
    default:Date.now
  },
  password: {
    type: Number
  },
  title: {
    type: String
  },
  Content: {
    type: String
  }
});

module.exports = mongoose.model("Reviews", goodsSchema);
