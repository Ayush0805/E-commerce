const availabilityData = require('./shipperAvailability')

module.exports={
    async createavailability(data){
        return await availabilityData(data).save();
    },
    async isShipperAvailabilityExist(id,currentMonth,currentYear){
        return await availabilityData.findOne({shipperId:id,month:currentMonth,year:currentYear})
    },
    async Applyleaves(shipperId,date,month,year){
        return await availabilityData.updateOne({shipperId:shipperId,month:month,year:year,'availabilities.date':date},{$set:{'availabilities.$.isAvailable':false}})
    },
    async appliedLeave(shipperId,date,month,year){
        return await availabilityData.findOne({shipperId:shipperId, month:month},{availabilities:{$elemMatch:{date:date,isAvailable:false}}})
    },
    async isAvailabilityExist(id,currentmonth,currentyear){
        console.log("Id",id,"currentmonth",currentmonth,"currentyear",currentyear)
        return await availabilityData.findOne({shipperId:id,month:currentmonth,year:currentyear})
    },
    async getLeavesData(data){
        console.log("data",data)
        return await availabilityData.find({shipperId:data.shipperId},{availabilities:{$elemMatch:{isAvailable:false}}})
    },


    
}