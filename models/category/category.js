const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    parentId :{type:String},
    categoryName:{type:String},
    categoryType:{type:String,default:'Parent'}
})
module.exports = mongoose.model('categories',categorySchema)