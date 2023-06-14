const dataHandling = require("../functions")
const ServiceAccount = require("../config/ServiceAccount.json")
const com=require("../common")
const admin = require('firebase-admin');




async function LoginStaff(req, res) {
    try {
        const {Email,Password}=req.body;
        const staffcheck=await dataHandling.Read("Staffs",undefined,undefined,undefined,1,["Email","==",Email,"Password","==",Password])
         console.log(staffcheck[0].DocId)
        if(staffcheck.length===1){
            const token=await com.GenerateToken({StaffId:staffcheck[0].DocId,...req.body})
         return res.json(token)
        
        }else{
            return res.json(false)
        }
    } catch (error) {
        console.log(error)
        return res.json(false)
    }
}

async function Update(req, res) {
    req.body.index = Date.now()
      await dataHandling.Update("Staffs", req.body, req.body.DocId)
      return res.json(true)
  }

  async function Read(req, res) {
    const data = await dataHandling.Read("Staffs", req.body.DocId, req.body.index, req.body.Keyword, req.body.Limit);
    return res.json(data)
  }


module.exports = {
    LoginStaff,
    Update,
    Read
}