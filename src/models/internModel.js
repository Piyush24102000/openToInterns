const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const internSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    collegeId:{
        type:objectId,
        ref:'College'
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

module.exports = mongoose.model('Intern',internSchema)