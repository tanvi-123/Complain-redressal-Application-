const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  area:String,
  pinCode:Number,
  isSelected:Boolean,
  dateCreated:String,

});

module.exports = new mongoose.model("locations", locationsSchema);