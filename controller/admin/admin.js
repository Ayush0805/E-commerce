const adminQuery = require('../../models/admin/index')
const userModule = require('../../models/user/index')
const {bcryptHash} = require('../../services/bcrypt/bcrypt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
async signup(req,res){
    const {firstName ,lastName ,email,password} = req.body
    if(!firstName) return res.status(422).send({code:422,status:'failure',message:'Please enter your firstName'})
    if(!lastName) return res.status(422).send({code:422,status:'failure',message:'Please enter your lastName'})
    if(!email) return res.status(422).send({code:422,status:'failure',message:'Please enter your email'})
    if(!password) return res.status(422).send({code:422,status:'failure',message:'Incorrect Password'})
    try{
        let adminData = await adminQuery.getAdmin({email:req.body.email})
        if(!adminData){
            let hashValue = bcryptHash(password,10)
            req.body.password = hashValue
            data = req.body
            await adminQuery.saveAdmin(data)
            return res.status(200).send({code:200,status:'success',message:'Signedup successfully'})
        }
      return res.status(200).send({code:200,status:'success',message:'Admin already exists'})
    }catch(err){
        return res.status(422).send({code:422,status:'failure',message:err.message})
    }
},
async login(req,res){
 const email = req.body.email
 const password = req.body.password
 if(!email) return res.status(422).send({code:422,status:'failure',message:'Enter your correct email'})
 if(!password) return res.status(422).send({code:422,status:'failure',message:'Enter your correct password'})
 try{
     let data = await adminQuery.getAdmin({email:req.body.email})
     if(!data) return res.status(422).send({code:422,status:'failure',message:'Admin not found'})
     const password = bcrypt.compareSync(req.body.password,data.password)
     if(!password) return res.status(422).send({code:422,status:'failure',message:'Password that you have entered is incorrect'})
     let token = jwt.sign({_id:data._id,email:data.email,firstName:data.firstName,lastName:data.lastName,roles:'Admin'},process.env.secretToken)
     return res.status(200).send({code:200,status:'success',data:token})
 }catch(err){
     return res.status(422).send({code:422,status:'failure',message:err.message})
 }
},
async getAllUser(req,res){
    let name = req.body.name
    let skip = req.body.skip
    let limit = req.body.limit
    if(!name || !skip || !limit) return res.status(422).send({code:422,status:'failure',message:"Data is missing"})
    try{
        // let admin = await adminQuery.getAdminData({_id:req.user._id})
        let data = await userModule.getUserlist(name,skip,limit)
        return res.status(200).send({code:200,status:'success',list:data})
    }catch(err){
         return res.status(422).send({code:422,status:'failure',messae:err.message})
     }
}
}