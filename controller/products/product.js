const productModule =require('../../models/product/index')
const firebaseService = require('../../services/firebase/firebase')
const fs = require('fs')


module.exports = {
async addProduct(req,res){
        const path = req.file.path;
        req.body = JSON.parse(JSON.stringify(req.body));
        let data = req.body
        if(  !data.productName ||!data.packSize ||!data.description ||!data.brand) return res.status(422).send({code:422,status:'failure',message:'Data is required'})
        try{
            let productData = await productModule.getProduct(data)
            if(productData){ 
                removeImage(path)
                return res.status(200).send({code:200,status:"success",message:'Product is already added'})
            }
            let image = await firebaseService.getUrl(path,"productImage")
            data.productImage =image;
            let product =await productModule.saveProduct(data)
            await removeImage(path)
            return res.status(200).send({code:200,status:"success",details:product})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
},
async removeProduct(req,res){
    const id = req.body.id
    if(!id) return res.status(422).send({code:422,status:'failure',message:'ProductId is required'})
    try{
        let productData = await productModule.removeProductData(id)
        return res.status(200).send({code:200,status:'success',data:productData})
    }catch(err){
        return res.status(422).send({code:422,status:'failure',message:err.message})
    }
},
async updateProduct(req,res){
    const data = req.body.data
    if(!data) return res.status(422).send({code:422,status:'failure',message:"Data is required"})
    try{
        let newData = await productModule.updateProductData(data)
        return res.status(200).send({code:200,status:'success',data:newData})
    }catch(err){
          return res.status(422).send({code:422,status:'failure',message:err.message})
         }  
},
async getProductList(req,res){
    const data = req.body
    if(!data) return res.status(422).send({code:422,status:'failure',message:"Data is required"})
    try{
        let newData = await productModule.productList(data)
        return res.status(200).send({code:200,status:'success',list:newData})
    }catch(err){
        return res.status(422).send({code:422,status:'failure',message:err.message})
    }
}
}
function removeImage(path){
    if(path){
        fs.unlink(path, function(err){
            if(err) console.log("error in deleting file!",err)
        })
    }
}