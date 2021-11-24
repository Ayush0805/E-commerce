
const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId:{type:String},
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    flatNo :{type:Number},
    street:{type:String},
    area :{type:String},
    landmark: {type:String},
    city: {type:String},
    state:{type:String},
    pinCode:{type:Number,required:true},
    isRemove:{type:Boolean,default:false},
    addressType :{type :String ,default:"Home"},
    isDefault:{type:Boolean,default:false}
})

module.exports = mongoose.model('address',addressSchema)