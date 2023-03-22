const mongoose=require('mongoose')

const complainLogs=new mongoose.Schema({
    complaintId:mongoose.Types.ObjectId,
    description:String,
    assignedEng:String,
    status:String,
    dateCreated:String
})

module.exports=new mongoose.model("complaintsLogs",complainLogs)