const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName :{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    phoneNumber:{type:Number},
    type:{type:String,default:"admin"}
})

module.exports = mongoose.model('admin',adminSchema)