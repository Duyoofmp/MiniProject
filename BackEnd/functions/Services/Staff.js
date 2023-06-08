const dataHandling = require("../functions")
const ServiceAccount = require("../config/ServiceAccount.json")

const admin = require('firebase-admin');




async function LoginStaff(req, res) {
    try {
        const {Email,Password}=req.body;
        const staffcheck=await dataHandling.Read("Staffs",undefined,undefined,undefined,1,["Email","==",Email,"Password","==",Password])
         console.log(staffcheck[0].DocId)

        if(staffcheck.length===1){
       
         return res.json(staffcheck[0].DocId)
        
        }else{
            return res.json(false)
        }
    } catch (error) {
        console.log(error)
        return res.json(false)
    }
}


module.exports = {
    LoginStaff
}