const paymentModule = require('../../models/payment/index')

module.exports={

    async makePayment(req,res){
        let data = req.body
        id = JSON.parse(JSON.stringify(req.user._id))
        if(!data || !data.amount) return res.status(422).send({code:422,status:'failure',message:'Data is required'})
        try{
            let payment_data = await paymentModule.createPayment(id,data)
            return res.status(200).send({code:200,status:'success',payment:payment_data})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}