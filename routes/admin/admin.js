const express = require('express')
const route = express.Router()
const authorize = require('../../services/authorization/authorization')
const roles = require('../../services/authorization/roles')

const adminModule= require('../../controller/admin/admin')


route.post('/admin-signup',adminModule.signup)
route.post('/admin-login',adminModule.login)
route.get('/get-all-user',authorize(roles.Admin),adminModule.getAllUser)


module.exports = route