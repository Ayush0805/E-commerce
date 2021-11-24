const categoryModule = require('../../models/category/index')

module.exports = {
    async addCategory(req,res){
        const categoryName = req.body.categoryName
        if(!categoryName) return res.status(422).send({code:422,status:'failure',message:'Category name is required'})
        try{
            let category = await categoryModule.getCategory(categoryName)
            if(category) return res.status(422).send({code:422,status:'failure',message:'Such category already exists'})
            if(!req.body.parentId){
                let newCategory ={
                    categoryName: req.body.categoryName, 
                }
                let newData = await categoryModule.saveCategory(newCategory)
                return res.status(200).send({code:200,status:'success',data:newData})
            }else{
                if(req.body.parentId){
                    let data ={
                        categoryName:req.body.categoryName,
                        parentId:req.body.parentId
                    }
                    let newData = await categoryModule.saveCategory(data)
                    let updateData = await categoryModule.updateCategory(newData) 
                    return res.status(200).send({code:200,status:'success',data:updateData})
                }
               }
       }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async getAllCategories(req,res){
        try{
            let data = await categoryModule.enlistCategories()
            return res.status(200).send({code:200,status:'success',list:data})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}