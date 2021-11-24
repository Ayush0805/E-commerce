const inventoryModule = require('../../models/inventory/index')


module.exports={
    async createInventory(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
       try{
            let inventory_data = await inventoryModule.isInventoryExist(data.productId)
            if(!inventory_data){
                let newData = await inventoryModule.saveInventory(data)
                return res.status(200).send({code:200,status:'success',inventory:newData})
            }else{
                if(inventory_data.productId == data.productId){
                    let newData = await inventoryModule.updateInventory(inventory_data._id,data)
                    return res.status(200).send({code:200,status:'success',inventory:newData})
                }
            }
       }catch(err){
           return res.status(422).send({code:422,status:'failure',message:err.message})
       }
    },
    async getInventory(req,res){
        try{
            let inventory_data = await inventoryModule.getInventoriesData()
            return res.status(200).send({code:200,status:'success',data:inventory_data})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}