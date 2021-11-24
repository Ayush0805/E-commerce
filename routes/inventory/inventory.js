const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')
const inventory = require('../../controller/inventory/inventory')

route.post('/create-inventory',authorize(roles.Admin),inventory.createInventory)
route.get('/get-inventory',authorize(roles.Admin),inventory.getInventory)

module.exports = route