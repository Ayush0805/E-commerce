const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
   productId:{type:String,required:true},
//    userId:{type:String,required:true},
   brandName:{type:String}
})

module.exports = mongoose.model('seller',sellerSchema)