const mongoose = require('mongoose')
const moment = require('moment')


const product_schema = new mongoose.Schema({
    productId:{type:mongoose.Schema.ObjectId,required:true},
    quantity:{type:Number,required:true}
})
const orderSchema = new mongoose.Schema({
    userId :{type:String,required:true},
    products:[product_schema],
    orderDate:{type:Date,default:Date.now()},
    delieveryDate:{type:String,default:null},
    paymentId:{type:String,required:true}, 
    paymentDone:{type:Boolean,default:false},
    isDelievered :{type:Boolean,default:false},
    addressId:{type:String,required:true},
    orderStatus:{type:String,default:'Pending'},
    shipperId:{type:String,required:true},
    isCancel:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()},
    cancelledAt:{type:Date,default:null}
})

module.exports = mongoose.model('orders',orderSchema)