const express= require('express')
const categories = require('../../controller/category/category')
const route = express.Router()

route.post('/add-category',categories.addCategory)
route.get('/get-categories',categories.getAllCategories)
module.exports = route
