const availabilityModule = require('../../models/shipperAvailability/index')
const moment = require('moment')

module.exports ={
    async setAvailability(req,res){
        let data = req.body
        if(!data) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        var currentDate = moment().format('D ')
        var currentMonth = moment().format('MM')
        let currentYear = moment().format('YYYY');
        let totalDays  = moment().daysInMonth();
        try{
            for(date=currentDate;date<=totalDays;date++){
                data.availabilities.push({date:date+'-'+currentMonth+'-'+currentYear,isAvailable:true})
            }
            let dataExist = await availabilityModule.isShipperAvailabilityExist(data.shipperId,currentMonth,currentYear)
            if(!dataExist){
                let availabilitiesData =await availabilityModule.createavailability(data)
                return res.status(200).send({code:200,status:'success',availability:availabilitiesData})
            }else{
                return res.status(200).send({code:200,status:'success',message:"Availability has been already set for this shipper"})
            }
            }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async applyLeave(req,res){
        let {shipperId,date,month,year} = req.body
        if( !shipperId ||!date ||!month ||!year) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        let totalDays= moment().daysInMonth()
        try{
            let DataExist = await availabilityModule.isAvailabilityExist(shipperId,month,year)
            if(!DataExist) await setAvailabilityForAnotherMonth(shipperId,date,month,year,totalDays)
            let leavesData = await availabilityModule.appliedLeave(shipperId,date,month,year)
            if(leavesData.availabilities == 0){
                 let newData = await availabilityModule.Applyleaves(shipperId,date,month,year)
                 return res.status(200).send({code:200,status:'success',message:"Applied Successfully"})
            }
            return res.status(200).send({code:200,status:'success',message:"leave for such date has been applied already"})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async myLeaves(req,res){
        let data=req.body
        if(!data || !data.shipperId) return res.status(422).send({code:422,status:'failure',message:"Data is missing"})
        try{
            let newData = await availabilityModule.getLeavesData(data)
            return res.status(200).send({code:200,status:'success',leaves:newData})
        }catch(err){
            console.log(err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}
async function setAvailabilityForAnotherMonth(shipperId,date,month,year,totalDays){
    let data ={
        shipperId :shipperId,
        month:month,
        year:year,
        availabilities:[]
    }
  
    for(let date=1;date<=totalDays;date++){
        data.availabilities.push({date:date+'-'+month+'-'+year,isAvailable:true})
    }
    let newData = await availabilityModule.createavailability(data)
    return newData
}