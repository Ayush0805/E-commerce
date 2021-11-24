const categoryData = require('./category')

module.exports= {
    async getCategory(categoryName){
        return await categoryData.findOne({categoryName})
    },
    async saveCategory(data){
        return await categoryData(data).save()
    },
    async updateCategory(data){
        console.log(data)
        return await categoryData.updateOne({_id:data._id},{categoryType:'subCategory'})
    },
    async enlistCategories(newData){
        return await categoryData.find(newData)
    }
}