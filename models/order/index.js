const orderData = require('./order')

module.exports ={
    async createOrders(_id,shipperId,data){
        shipperId = JSON.parse(JSON.stringify(shipperId))
        return await orderData({userId:_id,products:{productId:data.productId,quantity:data.quantity},addressId:data.addressId,shipperId:shipperId,paymentId:data.paymentId,delieveryDate:data.delieveryDate}).save()
    },
    async orderCancel(id){
        return await orderData.updateOne({_id:id},{$set:{orderStatus:"Cancelled"}})
    }
}