const functions = require('firebase-functions');

const admin = require('firebase-admin');
const dataHandling = require("../functions")
const db = admin.firestore();
const moment = require('moment-timezone')


async function Create(req, res) {
    req.body.index = Date.now()
  
    const check = await dataHandling.WhereGet("Products", "Name", req.body.Name);
    if (check) {
      await dataHandling.Create("Products", req.body)
      return res.json(true)
    } else {
      return res.json("Product with same name already exists !")
  
    }
  
  }
  async function Update(req, res) {
    req.body.index = Date.now();
    const check = await dataHandling.WhereGet("Products", "Namw", req.body.Name, req.body.DocId);
    if (check) {
      await dataHandling.Update("Products", req.body, req.body.DocId)
      return res.json(true)
    } else {
      return res.json("Product with same Name already exists !")
    }
  }
  async function Delete(req, res) {
    const lead = await db.collection("Lead").where("ProductId", "==", req.body.DocId).limit(1).get();
    if (lead.size === 0) {
      await dataHandling.Delete("Products", req.body.DocId)
      return res.json(true)
    } else {
      return res.json("Cannot Delete This Product At This Moment :(")
    }
  
  }
  
  async function Read(req, res) {
    const data = await dataHandling.Read("Products", req.body.DocId, req.body.index, req.body.Keyword,1000,["ManagerId","==",req.body.ManagerId]);
    return res.json(data)
  }

  
async function AssignProduct(req, res) {
    const temp = [];

    const today = moment().tz('Asia/Kolkata');
    
        req.body.ContactIds.forEach(Contactid => {
            temp.push(db.collection("Leads").doc(Contactid + "_" + req.body.ProductId).set({ContactId:Contactid,ProductId:req.body.ProductId,StaffId: req.body.StaffId, Status: "Open", index: Date.now(), Date: today.format('YYYY-MM-DD')}, { "merge": true }))
        })
    

    await Promise.all(temp)
    return res.json(true)
}
async function ViewAssignedStaffs(req, res) {
  const temp = [];
  

  const pro = await db.collection("Leads").where("ProductId","==",req.body.ProductId).get();
  pro.forEach(docs => { 
    temp.push(dataHandling.Read("Staffs", docs.data().StaffId))
  })
  return res.json(await Promise.all(temp))
}

async function GetAssignedContacts(req, res) {
  const temp = [];
  const pro = await db.collection("Leads").where("ProductId","==",req.body.ProductId).where("StaffId","==",req.body.StaffId).where("Status","==",req.body.Status).get();
  pro.forEach(docs => {
    temp.push(dataHandling.Read("Contacts", docs.data().ContactId))
  })
  return res.json(await Promise.all(temp))
}



async function SetAStatus(req, res) {
    const temp = [];
    db.collection("Leads").doc(req.body.LeadId).update({ "Status": req.body.Status })
        .then(snap => {
            return res.json(true);
        })
        .catch(err => {
            functions.logger.error(err);
            return res.json(false);
        })
}

async function AnalyticsOfProduct(req, res) {
 
  let assigned;
  let completed;
  let accepted;
  let rejected;
  let change;


  console.log(req.body)

    assigned = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["ProductId","==",req.body.ProductId],[false])
    completed = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["ProductId","==",req.body.ProductId,"Status","!=","Open"],[false])
    rejected = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["ProductId","==",req.body.ProductId,"Status","==","Rejected"],[false])
    accepted = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["ProductId","==",req.body.ProductId,"Status","==","Accepted"],[false])
    change = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["ProductId","==",req.body.ProductId,"Status","==","ChangeProduct"],[false])

  console.log(change.length)
  return res.json({Completed:completed.length,Assigned:assigned.length,Rejected:rejected.length,Accepted:accepted.length,ChangeRequested:change.length})
}

  module.exports = {
    Create,
    Update,
    Delete,
    Read,
    SetAStatus,
    AssignProduct,
    ViewAssignedStaffs,
    AnalyticsOfProduct,
    GetAssignedContacts
  }