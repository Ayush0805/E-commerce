let sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY);
const shipperModule = require('../../models/shipper/index')

let sendCredentials = async(toEmail,data) =>{
    console.log("email",toEmail,"data",data)
        try{
            const message ={
                from: process.env.SENDGRID_FROM_EMAIL,
                to: toEmail,
                subject:"Shipper Password Generator",
                html:`<div>
                    <p>Your Login portal username is : ${data.name}</p>
                    <p>Your Login portal password is : ${data.password}</p>
                    <p>you can login by <a href="http://localhost:9000/shipper-login">click here</a>. <br> Donot share it with anyone else.</p>
                </div>`
            };
            await sgMail.send(message);
        }catch(err){console.log("error of mail",err)}
}

module.exports = sendCredentials;
