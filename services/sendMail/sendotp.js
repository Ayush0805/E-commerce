const sgMail=require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY);
var generator = require('generate-otp')
var otp = generator.generate(6,{numbers:true})
const userModule = require('../../models/user/index')


 let sendEmail = async (toEmail)=> {
    try{
        const message = {
            from: process.env.SENDGRID_FROM_EMAIL,
            to: toEmail,
            subject:"Verification of an OTP",
            text:`It is an E-commerce login otp: ${otp} and Donot share it with anyone else.`
            
            };
           await userModule.saveOtp(toEmail,otp)
           await sgMail.send(message);
    }catch(err){console.log("error of mail:",err)}
}

module.exports = sendEmail;