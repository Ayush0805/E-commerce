const orderModule = require('../../models/order/index')
const shipperModule = require('../../models/shipper/index')
const addressModule = require('../../models/address/index')
const moment = require('moment')

module.exports ={
    async createOrder(req,res){
        let data = req.body
        id =JSON.parse(JSON.stringify(req.user._id))
        let currentDate =new Date()
        currentDate.setDate(currentDate.getDate() + 3);
        data.delieveryDate = moment(currentDate).format('D-MM-YYYY')
        if(!data || !data.productId ||!data.addressId  ||!data.paymentId) return res.status(422).send({code:422,status:'failure',message:"Data is required"})
        try{
            let address_data = await addressModule.getUserAddress(id,data.addressId)
            console.log("address_data",address_data)
            let shipper_data = await shipperModule.getNearByShipper(address_data.pinCode)
            console.log("shipper_data",shipper_data)
            if( !shipper_data) return res.status(422).send({code:422,status:'failure',message:"Shipper is not available for this area"})
            // let order_data = await orderModule.createOrders(id,shipper_data._id,data)
            return res.status(200).send({code:200,status:'success',order:shipper_data})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async cancelOrder(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:"Data is required"})
        try{
            let order_data = await orderModule.orderCancel(data.orderId)
            return res.status(200).send({code:200,status:'success',message:order_data})
        }catch(err){
              console.log(err)
              return res.status(422).send({code:422,status:'failure',message:err.message})
            }
    }
}