const mongoose=require("mongoose")
const problemTypes=new mongoose.Schema({
    serviceTypeId:String,
    name:String,
    isActive:Boolean,
    dateCreated:String
})
module.exports=new mongoose.model("problemTypes",problemTypes)