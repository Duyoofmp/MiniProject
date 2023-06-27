const dataHandling = require("../functions")
const ServiceAccount = require("../config/ServiceAccount.json")
const com=require("../common")

const admin = require('firebase-admin');



async function RegisterManager(req, res) {
    try {
        const {Name,Email,Password,PhoneNo}=req.body;
       
        const createUser=await  admin.auth().createUser({email:Email,password: Password,phoneNumber:String(PhoneNo),displayName:Name});
        await dataHandling.Create("Managers",{...req.body},createUser.uid)
        console.log(createUser.uid)
        const token=await com.GenerateToken({Role:"Manager",ManagerId:createUser.uid})

        return res.json({token:token})
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
   
}
async function LoginManager(req, res) {
    try {
        const {Email,Password}=req.body;
        const createUser=await  admin.auth().getUserByEmail(Email);
        // @ts-ignore
        const manData=await dataHandling.Read("Managers",createUser.uid)
         

        if(manData.Password===Password){
            const token=await com.GenerateToken({Role:"Manager",ManagerId:createUser.uid})

         return res.json(token)
        
        }else{
            return res.json(false)
        }
    } catch (error) { 
        console.log(error)
        return res.json(false)
    }
}


async function CreateStaff(req, res) {
    try {
        console.log(req.body)
        const checkuser=  await dataHandling.Read("Staffs",undefined,undefined,undefined,1,["Email","==",req.body.Email])
      
        console.log(req.body.Email)
        console.log(checkuser)
         if(checkuser.length===0){
            const manData=await dataHandling.Create("Staffs",{index:Date.now(),...req.body})
            return res.json(true)
        }else{
            return res.json(false)
        }
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)
    }
}


module.exports = {
    RegisterManager,
    LoginManager,
    CreateStaff
}