const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
     userId:{type:String,required:true},
     productId:{type:String,required:true},
     review:{type:String}
})

module.exports = mongoose.model('reviews',reviewSchema)