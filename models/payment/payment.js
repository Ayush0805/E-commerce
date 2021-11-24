const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
 userId:{type:String,required:true},
 amount:{type:Number},
 paymentType:{type:String,default:'Cash'},
 paymentTime:{type:Date,default:Date.now()},
 paymentStatus:{type:String,default:false}
})

module.exports = mongoose.model('payment',paymentSchema)