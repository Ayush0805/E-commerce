const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const products =require('../../controller/products/product')
const roles = require('../../services/authorization/roles')
const upload = require('../../services/multer/multer');

route.get('/get-product-list',products.getProductList)
route.post('/add-product',upload.single('image'),authorize(roles.Admin),products.addProduct)
route.delete('/remove-product',products.removeProduct)
route.post('/update-product',products.updateProduct)

module.exports= route