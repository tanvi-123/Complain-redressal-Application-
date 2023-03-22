
// const mongoose=require("mongoose")

// const complainSchema=new mongoose.Schema({
//    name:String,
//    email:String,
//    address:String,
//    pincode:Number,
//    contact:String,
//    typeOfProblem:String,
//    assignedEngineer:String,
//    status:String,
//    description:String
          
    
// })
// module.exports=mongoose.model("complain",complainSchema)


// const mongoose=require("mongoose")

// const complainSchema=new mongoose.Schema({
//    name:String,
//    email:String,
//    address:String,
//    pincode:Number,
//    contact:String,
//    typeOfProblem:String,
//    assignedEngineer:String,
//    status:String,
//    description:String
          
    
// })
// module.exports=new mongoose.model("complaints",complainSchema)

const mongoose=require("mongoose")
const complaints=new mongoose.Schema({
 ticketNumber:Number,
 userId:String,
 serviceTypeId:mongoose.Types.ObjectId,
 problemTypeId:mongoose.Types.ObjectId,
 firstName:String,
 lastName:String,
 address:String,
 pinCode:Number,
 phone:String,
 description:String,
 status :String,
 escalationDetails:String,
 assignUserId:String,
 fieldWorker:String,
 dateCreated:String,
          
    
})
module.exports=new mongoose.model("complaints",complaints)