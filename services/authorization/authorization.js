const jwt = require('express-jwt')
const secret = process.env.secretToken
const roles = require('./roles')
const userModule = require('../../models/user/index')
const adminModule = require('../../models/admin/index')

module.exports = authorize;

function authorize(roles =[]){

    if(typeof roles === 'String'){
        roles =[roles];
    }
    return [
        jwt({secret:secret ,algorithms :['HS256']}),
        (req,res,next)=>{
            if(roles.length && !roles.includes(req.user.roles)){
                return res.status(401).json({message:"Unauthorized"});
            }
            switch(req.user.roles){
                case 'User':
                    userModule.getUser({_id:req.user._id}).then(
                    user=>{
                 
                        if(user){
                            req.user=user
                            req.userType = 'User'
                            next()
                        }else{
                            return res.status(404).json({message:'User not found'})
                        }
                    }
                )
                break
                case 'Admin':
                    adminModule.getAdmin({_id:req.user._id}).then(
                        admin=>{
                    
                            if(admin){
                                req.user = admin
                                req.userType ='Admin'
                                next()
                            }else{
                                return res.status(404).send({message:'Admin not found'})
                            }
                        }
                    )
            }
        }
    ]
}