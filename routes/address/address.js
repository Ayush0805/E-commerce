const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const address = require('../../controller/address/address')

route.post('/add-address',authorize(roles.User),address.addAddress)
route.post('/update-address',authorize(roles.User),address.updateAddress)
route.delete('/remove-address',authorize(roles.User),address.removeAddress)
route.post('/make-this-address-default',authorize(roles.User),address.makeThisDefault)
route.get('/get-all-user-addresses',authorize(roles.User),address.getAllAddress)
module.exports = route