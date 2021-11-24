const shipperModule = require('../../models/shipper/index')
// const {bcryptHash} = require('../../services/bcrypt/bcrypt')
const randomize = require('randomatic')
const jwt = require('jsonwebtoken')

const sendCredentials = require('../../services/sendMail/sendPassword')

module.exports ={

 async shipperLogin(req,res){
       let data = req.body
       if(!data.email || !data.password) return res.status(422).send({code:422,status:'failure',message:"Data is missing"})
       try{
           let shipper_data = await shipperModule.getShipper(data)
           if(shipper_data.password != data.password) return res.status(422).send({code:422,status:'failure',message:"Incorrect password"})
           const payload = {
               shipperId : shipper_data._id,
               email:shipper_data.email
           }
           let token = jwt.sign(payload,process.env.secretToken,{expiresIn:'24h'})
           return res.status(200).send({code:200,status:'success',shipper:token})

       }catch(err){
           return res.status(422).send({code:422,status:'failure',message:err.message})
       }

 },
 async createShipper(req,res){
     let data = req.body
     if(!data.email  ||!data.phoneNumber ||!data.name ||!data.pinCode) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
     try{
        let shipper_data = await shipperModule.isShipperExist(data)
        if(shipper_data){
            if(shipper_data.phoneNumber == data.phoneNumber) return res.status(422).send({code:422,status:'failure',message:'PhoneNumber must be unique'})
            if(shipper_data.email == data.email) return res.status(422).send({code:422,status:'failure',message:'email must be unique'})
        }   
        data.password = randomize('Aa0!',10)
        let newData = await shipperModule.saveShipperData(data)
        let shipperCredentials= await sendCredentials(data.email,data) 
        return res.status(200).send({code:200,status:'success',shipper:newData})
     }catch(err){
         return res.status(422).send({code:422,status:'failure',message:err.message})
     }
 },
 async removeShipper(req,res){
     let data = req.body
     if(!data.id) return res.status(422).send({code:422,status:'failure',message:'Shipper id is required'})
     try{
         let shipper_data = await shipperModule.removingShipper(data.id)
         return res.status(200).send({code:200,status:'success',shipper:shipper_data})
     }catch(err){
         return res.status(422).send({code:422,status:'failure',message:err.message})
     }
 },
 async getShipper(req,res){
     let {skip,limit} = req.body
     if(!limit) return res.status(200).send({code:200,status:'success',message:"Data is required"})
     try{
        let list = await shipperModule.getallShipper(skip,limit)
        return res.status(200).send({code:200,status:'success',shippers:list})
     }catch(err){
         return res.status(422).send({code:422,status:'failure',message:err.message})
     }
 },
 async updateShipper(req,res){
     let data = req.body
     if(!data.id) return res.status(422).send({code:422,status:'failure',message:'Data is required'})
     try{
         let shipper_data = await shipperModule.updateshipperData(data)
         return res.status(200).send({code:200,status:'success',shipper:shipper_data}) 
     }catch(err){
         console.log(err)
         return res.status(422).send({code:422,status:'failure',message:err.message})
     }
 },
 async updatePassword(req,res){
     let data = req.body
     if(!data.shipperId || !data) return res.status(422).send({code:422,status:'failure',message:"Data is missing"})
     try{
         let shipper_data= await shipperModule.updateShipperPassword(data)
         shipper_data.password = data.password
         return res.status(200).send({code:200,status:'success',shipper:shipper_data})
      }catch(err){
         console.log(err)
         return  res.status(422).send({code:422,status:'failure',message:err.message})
     }
 }

}