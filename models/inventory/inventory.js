const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    productId:{type:mongoose.Schema.ObjectId},
    quantity:{type:Number},
    bookedProduct:{type:Number,default:0},
    soldOutProduct :{type:Number,default:0},
    defectedProduct: {type:Number,default:0}
})

module.exports= mongoose.model('inventory',inventorySchema)