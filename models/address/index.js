const addressData = require('./address')

module.exports={
    async isAddressExist(_id,data){
        return await addressData.findOne({userId:id,name:data.name,phoneNumber:data.phoneNumber,flatNo:data.flatNo,street:data.street,area:data.area,pinCode:data.pinCode,landmark:data.landmark,city:data.city,state:data.state,addressType:data.addressType})
    },
    async saveAddress(id,data){
        return await addressData({userId:id,name:data.name,phoneNumber:data.phoneNumber,flatNo:data.flatNo,street:data.street,area:data.area,pinCode:data.pinCode,landmark:data.landmark,city:data.city,state:data.state,addressType:data.addressType}).save()
    },
    async updateAddressData(data){
        return await addressData.updateOne({_id:data._id,userId:data.userId,name:data.name},{$set:{flatNo:data.flatNo,street:data.street,area:data.area,pinCode:data.pinCode,landmark:data.landmark,city:data.city,state:data.state,addressType:data.addressType}})
    },
    async getAddress(address_data,data){
        return await addressData.findOne({_id:address_data._id,name:data.name,phoneNumber:data.phoneNumber,flatNo:data.flatNo,street:data.street,area:data.area,pinCode:data.pinCode,landmark:data.landmark,city:data.city,state:data.state,addressType:data.addressType})
    },
    async removeAddressData(data){
        return await addressData.updateOne({_id:data._id},{isRemove:true})
    },
    async defaultAddress(_id){
        return await addressData.findOneAndUpdate({_id:_id,isRemove:false},{$set:{isDefault:true}})
    },
    async getParticularUserAddress(id){
        return await addressData.find({userId:id,isRemove:false})
    },
    async isDefaultAddressExist(id){
        return await addressData.findOneAndUpdate({isDefault:true},{$set:{isDefault:false}})
    },
    async getUserAddress(id,Id){
        return await addressData.findOne({_id:Id,userId:id,isRemove:false})
    } 


}