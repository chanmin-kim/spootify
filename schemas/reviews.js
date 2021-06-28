const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  username: {
    type: String,
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
  content: {
    type: String
  }
});

module.exports = mongoose.model("Reviews", goodsSchema);
