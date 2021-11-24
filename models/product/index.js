
const productData = require('./product')

module.exports= {
    async saveProduct(data){
        return await productData(data).save()
    },
    async removeProductData(id){
      return await productData.updateOne({_id:id},{isRemove:true})
    },
    async updateProductData(data){
        console.log("DATA:::::::",data)
        return await productData.updateOne({_id:data.id},{discount:data.discount})
    },
    async productList(data){
        return await productData.find({$and : [{productName : new RegExp(data.productName,'i')},{categoryId:data.categoryId},{isRemove:{$ne:true}}]}).skip(data.skip).limit(data.limit)
    },
    async getProduct(data){
        return await productData.findOne({productName:data.productName,brand:data.brand,packSize:data.packSize,description:data.description,isRemove:false})
    },

}