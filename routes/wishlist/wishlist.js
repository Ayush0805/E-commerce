const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const wishlist = require('../../controller/wishlist/wishlist')

route.post('/add-products-to-wishlist',authorize(roles.User),wishlist.addProduct)
route.post('/remove-product-from-wishlist',authorize(roles.User),wishlist.removewishlist)
route.get('/get-product-details',authorize(roles.User),wishlist.getProductList)

module.exports = route