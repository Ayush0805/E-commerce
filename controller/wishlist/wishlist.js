const wishlistModule = require('../../models/wishlist/index')

module.exports ={
    async addProduct(req,res){
        let data = req.body
        let userId = req.user._id;
        userId = JSON.parse(JSON.stringify(userId));
        if(!data ) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
            let wishlist_data = await wishlistModule.isWishlistExist(userId,data)
            if(wishlist_data){
                
                if(wishlist_data.product.length){
                    let newData = await wishlistModule.updateProduct(wishlist_data,data)
                    return res.status(200).send({code:200,status:'success',list:newData})
                }else{
                    let newData = await wishlistModule.createProduct(wishlist_data._id,data)
                    return res.status(200).send({code:200,status:'success',wishlist:newData})
                }
            }
            let newdata = await wishlistModule.createWishlist(req.user._id,data)
            return res.status(200).send({code:200,status:'success',wishlist:newdata})

        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }

    },
    async removewishlist(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
            let productData = await wishlistModule.removeProductFromWishlist(data)
            return res.status(200).send({code:200,status:'success',product:productData})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async getProductList(req,res){
        let cartId = req.body.cartId
        if(!cartId) return res.status(422).send({code:422,status:'failure',message:'Data is required'})
        try{
           let data = await wishlistModule.productDetails(cartId)
           return res.status(200).send({code:200,status:'success',list:data})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }

}