const shipperData = require('./shipper')

module.exports ={
 async isShipperExist(data){
     return await shipperData.findOne({$or:[{phoneNumber:data.phoneNumber},{email:data.email}]})
 },
 async saveShipperData(data){
     return await shipperData(data).save()
 },
 async removingShipper(id){
     return await shipperData.updateOne({_id:id},{$set:{isRemove:true,removedAt:Date.now()}})
 },
 async getallShipper(skip,limit){
     return await shipperData.find({isRemove:false}).skip(skip).limit(limit)
 },
 async updateshipperData(data){
   return await shipperData.updateOne({_id:data.id},{$set:{name:data.name,phoneNumber:data.PhoneNumber,pinCode:data.pinCode,modifiedAt:Date.now()}})
 },
async getShipper(data){
     return await shipperData.findOne({email:data.email}) 
},
async updateShipperPassword(data){
    return await shipperData.findOneAndUpdate({_id:data.shipperId},{$set:{password:data.password}})
},
async getNearByShipper(pinCode){
    // return await shipperData.findOne({pinCode:pinCode}).sort({orderQuantity:1})
    return await shipperData.aggregate([
        {
            $match:{pinCode:pinCode,isRemove:false}
        },
        {
            $lookup:{
                from:'shipperavailabilities',
                localField:'_id',
                foreignField:'shipperId',
                as:"ShipperAvailability"
            }
        },
        {
            $unwind :"$ShipperAvailability"
        },
        {
            $unwind:"$ShipperAvailability.availabilities"
        },
        {
            $group:{
                "_id":"$_id",
                "name":{$first:"$name"},
                "email":{$first:"$email"},
                "pinCode":{$first:"$pinCode"},
                "phoneNumber":{$first:"$phoneNumber"},
                "ShipperAvailability":{
                    $push:{
                        "date":"$ShipperAvailability.availabilities.date",
                        "isAvailable":"$ShipperAvailability.availabilities.isAvailable",
                        "delieveryQuantity":"$ShipperAvailability.availabilities.delieveryQuantity"
                    }
                }
            }
        },
        {
            $unwind :"$ShipperAvailability"
        },
    
        // {
        //     $project:{
        //         "_id":1,
        //         "name":1,
        //         "pinCode":1,
        //         "email":1,
        //         "phoneNumber":1,
        //         "ShipperAvailability.date":1,
        //         "ShipperAvailability.isAvailable":1,
        //         "ShipperAvailability.delieveryQuantity":1
        //     }
        // }
    ])
}
}