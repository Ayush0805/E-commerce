const wishlistData = require('./wishlist')
const {ObjectId} = require('bson')

module.exports = {
    async isWishlistExist(_id,data){//data
        return await wishlistData.findOne({userId:_id},{product:{$elemMatch:{productId:data.productId}}})//"product.productId":data.productId
    },
    async createWishlist(id,data){
        return await wishlistData({userId:id,product:{productId:data.productId,quantity:data.quantity},intoWishlist:true}).save()
    },
    async updateProduct(data,data1){
        return await wishlistData.updateOne({_id:data._id,"product.productId":ObjectId(data1.productId)},{"product.$.quantity":data1.quantity})
    },
    async createProduct(_id,data){
        return await wishlistData.updateOne({_id:_id},{$addToSet:{product:{productId:data.productId,quantity:data.quantity}}})
    },
    async removeProductFromWishlist(data){
        return await wishlistData.updateOne({_id:ObjectId(data.cartId)},{$pull:{product:{productId:ObjectId(data.productId)}}})
    },
    async productDetails(cartId){
        return await wishlistData.aggregate([
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
    }
}