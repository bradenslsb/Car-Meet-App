const mongoose = require("mongoose")

const carmeetSchema = new mongoose.Schema({
  name: { type: String, require: true, minlength: 3, maxlength: 60},
  author: String,
  uid: String,
  isPast: Boolean,
  price: Number,
  desc: { type: String, maxlength: 7000},
  date: { type: Date},
  country: String,
  region: String,

})

const Carmeet = mongoose.model("Carmeet", carmeetSchema)

exports.Carmeet = Carmeet