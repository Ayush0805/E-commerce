const userModule = require('../../models/user/index')
const sendEmail = require('../../services/sendMail/sendotp')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_SERVICE_SID)
const jwt = require('jsonwebtoken')

module.exports = {
    async createAnAccount(req,res){
     let data= req.body.data
     if(!data) return res.status(422).send({code:422,status:'failure',message:'Data is required'})
     try{
         let newUser = await userModule.getNewUserData(data)
         if(!newUser){
             let newData = {
                 firstName:data.firstName,
                 lastName:data.lastName,
                 email:data.email,
                 phoneNumber:data.phoneNumber
             }
             let user=await userModule.saveNewUserData(newData)
            //  console.log("user",user)
            //  let updateAddressData = await UserModule.getUserAddress(user)
             return res.status(200).send({code:200,status:'success',acc:user})
         }
         return res.status(422).send({code:422,status:'failure',message:'User already have an account.'})
     }catch(err){
         console.log(err)
         return res.status(422).send({code:422,status:'failure',message:err.message})}
    },
    async login(req,res){
      const phoneNumber = req.body.phoneNumber
      const email = req.body.email
      const loginType = req.body.loginType
      try{
          if(loginType=="phoneNumber"){
          let user = await userModule.getUser({phoneNumber:phoneNumber})
          if(!user) return res.status(422).send({code:422,status:'failure',message:'You are a new user, please create a new account first.'})
             let newData = await userModule.sendOtp(phoneNumber)
             return res.status(200).send({code:200,status:'success',message:"OTP sent successfully"})
          }else if(loginType=="email"){
           let user = await userModule.getUser({email:email})
           if(!user) return res.status(422).send({code:422,status:'failure',message:'You are a new user, please create a new account first.'})
           let newData = await sendEmail(email)
           return res.status(200).send({code:200,status:'success',data:"OTP sent successfully"})
          }else{
              return res.status(422).send({code:422,status:'failure',message:'Use your phoneNumber or email to login'})
          }
      }catch(err){
          return res.status(422).send({code:422,status:'failure',message:err.message})
      }
    },
    async verifyOtp(req,res){
        let data = req.body.data
        if(!data) return res.status(422).send({code:422,status:'failure',message:'Data required'})
        try{
            if(data.loginType=="phoneNumber"){
            const check = await client.verify.services(process.env.TWILIO_SERVICE_SID)
              .verificationChecks
              .create({
                 to: data.phoneNumber,
                 code: data.otp
                }).catch(e => {
                   return  res.status(422).send({code:422,status:'failure',message:e.message})
                 })
               return res.status(200).send({code:200,status:'success',message:"signin successfully",data:check})
                }else if(data.loginType=='email'){
                    let check = await userModule.checkOtp(data)
                    if(!check) return res.status(422).send({code:422,status:'failure',message:"Invalid otp"})
                    let token = jwt.sign({_id:check._id,email:check.email,FirstName:check.firstName,lastName:check.lastName,roles:'User'},process.env.secretToken)
                    return res.status(200).send({code:200,status:'success',message:'Your Email is verified',data:token})
                }else{
                    return res.status(422).send({code:422,status:'failure',message:'Invalid OTP'})
                }
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },

}