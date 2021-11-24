const express = require('express')
const {verifyOtp,createAnAccount,login } = require('../../controller/user/user')
const route = express.Router()


route.post('/check-otp',verifyOtp)
route.post('/create-an-account',createAnAccount)
route.post("/user-login",login)

module.exports= route