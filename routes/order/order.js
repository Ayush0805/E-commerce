const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const orders = require('../../controller/order/order')

route.post('/create-order',authorize(roles.User),orders.createOrder)
route.post('/cancel-order',authorize(roles.User),orders.cancelOrder)

module.exports= route