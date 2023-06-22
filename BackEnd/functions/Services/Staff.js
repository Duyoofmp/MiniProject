const dataHandling = require("../functions")
const ServiceAccount = require("../config/ServiceAccount.json")
const com=require("../common")
const admin = require('firebase-admin');
const db = admin.firestore();




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
    console.log(req.body)
    const data = await dataHandling.Read("Staffs", req.body.StaffId, req.body.index, req.body.Keyword);
    return res.json(data)
  }

  async function GetProductsOfStaff(req, res) {
    const temp = [];
    
  
    const pro = await db.collection("Staffs").doc(req.body.StaffId).collection("AssignedProducts").where("TotalNo", ">=", 1).get();
    pro.forEach(docs => {
      temp.push(dataHandling.Read("Products", docs.id))
    })
    return res.json(await Promise.all(temp))
  }


  async function ContactListOfProduct(req, res) {
    const temp = [];
    let flag = 0;
    const temp1 = [];
    const lead = [];
    const dates = [];
  
    const ProductId = req.body.ProductId;
    const staffId = req.body.StaffId;
    const Status = req.body.Status;
   
    let query = db.collection("Leads").where("Status", "==", Status).where("ProductId", "==", ProductId);
    if (staffId !== "") {
      query = query.where("StaffId", "==", staffId);
    }
    
    if (flag === 0) {
      query = query.orderBy('index', "desc");
    }
  
   
    const con = await query.get();
    const staffPromise = [];
    con.forEach(Id => {
      temp.push(db.collection("Contacts").doc((Id.data().ContactId)).get());
      lead.push(Id.id);
      dates.push(Id.data().Date);
      if (staffId === "") {
        staffPromise.push(db.collection("Staffs").doc((Id.data().StaffId)).get());
      }
    })
    const data = await Promise.all(temp);
    const StaffData = await Promise.all(staffPromise);
  
    data.forEach((docs, index) => {
      const data = { ...docs.data(), LeadId: lead[index], DocId: lead[index], ContactId: docs.id, "Date": dates[index] };
      if (staffId === "") {
        data["StaffName"] = StaffData[index].data().StaffName;
      }
      temp1.push(data);
    })
    return res.json(temp1)
  }
  


module.exports = {
    LoginStaff,
    Update,
    Read,
    ContactListOfProduct,
    GetProductsOfStaff
}