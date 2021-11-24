
const cartData = require('./cart')
const {ObjectId} = require('bson')


module.exports ={

    async saveDataToCart(id,data){
        return  await cartData({userId:id,product:{productId:data.productId,quantity:data.quantity},intoCart:true}).save()
    } ,
    async isCartExist(id,data){
        return await cartData.findOne({userId:id},{product:{$elemMatch:{productId:data.productId}}})

    },
    async addProductToCart(_id,data){
        return await cartData.updateOne({_id:_id},{$addToSet:{product:{productId:data.productId,quantity:data.quantity}}})
    },
    async updateQuantity(_id,data){
        return await cartData.updateOne({_id:_id, 'product.productId':ObjectId(data.productId)},{$set:{"product.$.quantity":data.quantity}})
    },
    async getProductDetails(cartId){

        return await cartData.aggregate([
            {$match:{_id:ObjectId(cartId)}},
            {
                $unwind : '$product'
            },
            {
                $lookup:{
                    from:"products",
                    localField:"product.productId",
                    foreignField:"_id",
                    as:"product_details"
                }
            },
            {$unwind:"$product_details"},
            {
                $project:{
                    "_id" : 1,
                    "userId":1,
                    "product":{
                      
                            "_id":"$product.productId",
                            "categoryId":"$product_details.categoryId",
                            "productName":"$product_details.productName",
                            "brand":"$product_details.brand",
                            "price":"$product_details.price",
                            "packSize":"$product_details.packSize",
                            "description":"$product_details.description",
                            "isAvailable":"$product_details.isAvailable",
                            "addedBy":"$product_details.addedBy",
                            "isRemove":"$product_details.isRemove"

                       
                    }
                }
            }
        ])
    },
    async removeProductFromCart(data){
        return await cartData.updateOne({_id:ObjectId(data.cartId)},{$pull : {product :{productId:ObjectId(data.productId)}}})
    }
    
}