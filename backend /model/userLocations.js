const mongoose=require('mongoose')
const userLocation=new mongoose.Schema({
    userId:String,
    locationId:String
})

module.exports=new mongoose.model("userLocations",userLocation)