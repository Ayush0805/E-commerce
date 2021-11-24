const express = require('express')
const route = express.Router()
const availability = require('../../controller/shipperAvailability/shipperAvailability')

route.post('/set-availabilities',availability.setAvailability)
route.post('/apply-leaves',availability.applyLeave)
route.get('/get-my-leaves',availability.myLeaves)

module.exports = route