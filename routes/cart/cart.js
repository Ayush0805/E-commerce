const express = require('express')
const cart = require('../../controller/cart/cart')
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const route = express.Router()

route.post('/add-to-cart',authorize(roles.User),cart.addToCart)
route.get('/get-cart',authorize(roles.User),cart.getCart)
route.delete('/remove-products-from-cart',authorize(roles.User),cart.removeCart)

module.exports= route