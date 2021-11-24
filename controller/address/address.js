const addressModule = require('../../models/address/index')

module.exports ={
    async addAddress(req,res){
        let data = req.body
        id = JSON.parse(JSON.stringify(req.user._id))
        if( !data || !data.flatNo || !data.street || !data.area || !data.city ||!data.state ) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
            let address_data = await addressModule.isAddressExist(id,data)
            if(!address_data){
                let newData = await addressModule.saveAddress(id,data)
                return res.status(200).send({code:200,status:'success',address:newData})
            }else{
                return res.status(200).send({code:200,status:'success',address:"Address already Exist"})
                }
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async updateAddress(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
            let address_data = await addressModule.updateAddressData(data)
            return res.status(422).send({code:422,status:'failure',address:address_data})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async removeAddress(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:"Data is missing"})
        try{
            let removeData = await addressModule.removeAddressData(data)
            return res.status(200).send({code:200,status:'success',message:removeData})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async makeThisDefault(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:"Data is missing"})
        try{
            let defaultData = await addressModule.isDefaultAddressExist(data._id)
           let address_data = await addressModule.defaultAddress(data._id)
           address_data.isDefault=true
           return res.status(200).send({code:200,status:'success',address:address_data}) 
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async getAllAddress(req,res){
        id = JSON.parse(JSON.stringify(req.user._id))
        try{
          let listData = await addressModule.getParticularUserAddress(id)
          return res.status(200).send({code:200,status:'success',list:listData})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}