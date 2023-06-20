const functions = require('firebase-functions');

const admin = require('firebase-admin');
const dataHandling = require("../functions")
const db = admin.firestore();
const moment = require('moment-timezone')


async function Create(req, res) {
    req.body.index = Date.now()
  
    const check = await dataHandling.WhereGet("Report", "Name", req.body.Name);
    if (check) {
      await dataHandling.Create("Report", req.body)
      return res.json(true)
    } else {
      return res.json("Report with same name already exists !")
  
    }
  
  }
  async function Update(req, res) {
    req.body.index = Date.now();
    const check = await dataHandling.WhereGet("Report", "Namw", req.body.Name, req.body.DocId);
    if (check) {
      await dataHandling.Update("Report", req.body, req.body.DocId)
      return res.json(true)
    } else {
      return res.json("Report with same Name already exists !")
    }
  }
  async function Delete(req, res) {
    const lead = await db.collection("Lead").where("ReportId", "==", req.body.DocId).limit(1).get();
    if (lead.size === 0) {
      await dataHandling.Delete("Report", req.body.DocId)
      return res.json(true)
    } else {
      return res.json("Cannot Delete This Report At This Moment :(")
    }
  
  }
  
  async function Read(req, res) {
    const data = await dataHandling.Read("Report", req.body.DocId, req.body.index, req.body.Keyword);
    return res.json(data)
  }

  
async function AssignProduct(req, res) {
    const temp = [];
    const today = moment().tz('Asia/Kolkata');
    
        req.body.ContactIds.forEach(Contactid => {
            temp.push(db.collection("Leads").doc(Contactid + "_" + req.body.ProductId).set({StaffId: req.body.StaffId, Status: "Open", index: Date.now(), Date: today.format('YYYY-MM-DD')}, { "merge": true }))
        })
    

    await Promise.all(temp)
    return res.json(true)
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
  module.exports = {
    Create,
    Update,
    Delete,
    Read,
    SetAStatus,
    AssignProduct
  }