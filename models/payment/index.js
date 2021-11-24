const paymentData = require('./payment')

module.exports ={
    async createPayment(id,data){
        return await paymentData({userId:id,amount:data.amount}).save()
    }
}