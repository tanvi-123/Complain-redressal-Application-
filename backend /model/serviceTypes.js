const mongoose = require('mongoose')
const serviceTypesSchema = new mongoose.Schema({
    name:String,
    isActive:Boolean,
    dateCreated:String
})


module.exports = new mongoose.model('serviceTypes',serviceTypesSchema)
