const adminData = require('../admin/admin')

module.exports ={
async getAdmin(data){
    // console.log("req.user in add product query method ",data)
    return await adminData.findOne({data})
},
async saveAdmin(data){
    return await adminData(data).save()
},
async getAdminData(id){
    id=JSON.parse(JSON.stringify(id))
    return await adminData.findOne({_id:id})
}
}