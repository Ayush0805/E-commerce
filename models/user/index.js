const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_SERVICE_SID)
const userData = require('./user')

module.exports = {
    async sendOtp(phoneNumber) {
            await client.verify.services(process.env.TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: phoneNumber,
                channel: 'sms',
                locale: 'en'
            })
            .then(verification => console.log(verification.status))
            .catch(err => {
                console.log(err)
            })

    },
    async getNewUserData(data){
      return await userData.findOne(data)
    },
    async saveNewUserData(data){
        return await userData(data).save()
    },
    async getUser(data){
        return await userData.findOne(data)
    },
    async saveOtp(email,otp){
        return await userData.updateOne({email:email},{$set:{OTP:otp,loginType:"email"}})
    },
    async checkOtp(data){
        return await userData.findOne({email:data.email,OTP:data.otp})
    },
    async getUserlist(name,skip,limit){
        return await userData.find({firstname:new RegExp(name,'i')}).skip(skip).limit(limit)
    },
    async getUserData(userId){
        return await userData.findOne({_id:userId})
    },
    
}