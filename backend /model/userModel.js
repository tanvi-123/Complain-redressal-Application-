const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address1: String,
  username: String,
  password: String,
  phone: String,
  email: String,
  pinCode: Number,
  userType: String,
  assignedEngineerToManager:Array,
  serviceType:mongoose.Types.ObjectId,
  isApproved:Boolean,
  dateCreated:String,

});

module.exports = new mongoose.model("users", userSchema);
