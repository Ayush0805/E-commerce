const inventoryData = require('./inventory')

module.exports={
   async isInventoryExist(id){
     return await inventoryData.findOne({productId:id})
   },
    async saveInventory(data){
        return await inventoryData(data).save()
   },
   async updateInventory(_id,data){
   return await inventoryData.updateOne({_id:_id,productId:data.productId},{$set:{bookedProduct:data.bookedProduct,defectedProduct:data.defectedProduct,quantity:data.quantity,soldOutProduct:data.soldOutProduct}})
   },
   async getInventoriesData(){
       return await inventoryData.aggregate([
           {
               $lookup:{
                   from:'products',
                   localField:'productId',
                   foreignField:'_id',
                   as:'product_details'
               }
           },{
            $unwind:'$product_details'
           },
           {
               $project:{
                   "_id":1,
                   "productId":1,
                   "quantity":1,
                   "bookedProduct":1,
                   "SoldOutProduct":1,
                   "InStockProduct":1,
                   "defectedProduct":1,
                  "categoryId": "$product_details.categoryId",
                   "productName":"$product_details.productName",
                   "brand":"$product_details.brand",
                   "price":"$product_details.price",
                   "discount":"$product_details.discount",
                   "productImage":"$product_details.productImage",
                   "description":"$product_details.description",
                   "rating":"$product_details.rating",
                   "packSize":"$product_details.packSize",
                   "isAvailable":"$product_details.isAvailable",
                   "addedBy":"$product_details.addedBy",
                   "isRemove":"$product_details.isRemove"

               }
           }
       ])
   }
}