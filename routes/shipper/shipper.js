const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const shipper = require('../../controller/shipper/shipper')

route.post('/create-shipper',authorize(roles.Admin),shipper.createShipper)
route.delete('/remove-shipper',authorize(roles.Admin),shipper.removeShipper)
route.get('/get-shippers',authorize(roles.Admin),shipper.getShipper)
route.post('/update-shipper',authorize(roles.Admin),shipper.updateShipper)
route.post('/shipper-login',shipper.shipperLogin)
route.post('/update-password',shipper.updatePassword)

module.exports = route