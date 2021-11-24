const mongoose = require('mongoose')


const product_Schema = new mongoose.Schema({
    productId:{type:mongoose.Schema.ObjectId},
    quantity:{type:String,default:"1"}
})


const cartSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    product :[product_Schema],
    intoCart :{type:Boolean,default:false},
    // isWishlist :{type:Boolean,default:false}
})

module.exports = mongoose.model('cart',cartSchema) 