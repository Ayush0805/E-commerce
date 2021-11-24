const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type:String , required:true},
    lastName: {type:String , required:true},
    email: {type:String , required:true},
    password :{type:String},
    age: {type:Number},
    phoneNumber :{type:String,required:true},
    gender:{type:String},
    addressId:{type:String,default:null},
    loginType:{type:String},
    OTP:{type:Number,default:null}
    
})

module.exports = mongoose.model('user',userSchema)