const express = require('express')
const route  = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const payment = require('../../controller/payment/payment')

route.post('/make-payment',authorize(roles.User),payment.makePayment)
module.exports = route