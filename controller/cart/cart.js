const cartModule = require('../../models/cart/index')
const userModule = require('../../models/user/index')

module.exports={
    async addToCart(req,res){
       let data = req.body
       if(!data)return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
       try{
          let cartData = await cartModule.isCartExist(req.user._id,data)
          if(cartData){
              if(cartData.product.length){
                let data = req.body
                let newData = await cartModule.updateQuantity(cartData._id,data)
                return res.status(200).send({code:200,status:'success',cart:" Quantity updated "})
                } else{
                    let newData =await cartModule.addProductToCart(cartData._id,data)
                    return res.status(200).send({code:200,status:'success',cart:newData})
                   }
          }
          let newData = await cartModule.saveDataToCart(req.user._id,data)
          return res.status(200).send({code:200,status:'success',cart:newData})
        }catch(err){
              return res.status(422).send({code:422,status:'failure',mesage:err.message})
           }
    },
    async getCart(req,res){
        let cartId = req.body.cartId
        if(!cartId) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
          let productData = await cartModule.getProductDetails(cartId)
          return res.status(200).send({code:200,status:'success',list:productData})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async removeCart(req,res){
        let data = req.body
        
        if(!data) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
            let removeData = await cartModule.removeProductFromCart(data)
            return res.status(200).send({code:200,status:'success',data:removeData})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}