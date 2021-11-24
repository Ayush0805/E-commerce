const mongoose = require('mongoose')

const shipperSchema = new mongoose.Schema({
  name :{type:String},
  pinCode:{type:Number,required:true},
  email:{type:String,required:true},
  phoneNumber :{type:Number,required:true},
  password:{type:String},
  isRemove:{type:Boolean,default:false},
  createdAt:{type:Date,default:Date.now()},
  modifiedAt:{type:Date,default:null},
  removedAt:{type:Date,default:null},
})

module.exports = mongoose.model('shipper',shipperSchema)