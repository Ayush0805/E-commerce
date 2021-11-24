const mongoose = require('mongoose')
const moment = require('moment')

const availabilitySchema = new mongoose.Schema({
    date:{type:String,default:null},
    isAvailable:{type:Boolean,default:true},
    delieveryQuantity:{type:Number,default:0}

})

const shipperAvailabilitySchema = new mongoose.Schema({
    shipperId :{type:mongoose.Schema.ObjectId,required:true},
    availabilities : [availabilitySchema],
    month:{type:String,default:moment().format('MM')},
    year:{type:String,default:moment().format('YYYY')}
})

module.exports = mongoose.model('shipperAvailabilities',shipperAvailabilitySchema)