const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    categoryId:{type:String,required:true},
    productName: {type:String,required:true},
    brand:{type:String,required:true},
    price:{type:Number,required:true},
    discount:{type:Number},
    productImage:{type:String,default:null},
    description:{type:String,required:true},
    rating:{type:Number},
    ratingCount:{type:Number,default:null},
    packSize :{type:String,required:true},
    isAvailable:{type:Boolean,default:true},
    addedBy:{type:String,required:true},
    isRemove:{type:Boolean,default:false}
})
module.exports = mongoose.model('products',productSchema)