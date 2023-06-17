const functions = require('firebase-functions');

const admin = require('firebase-admin');
const dataHandling = require("../functions")
const db = admin.firestore();
const moment = require('moment-timezone')


async function Create(req, res) {
    req.body.index = Date.now()
  
    const check = await dataHandling.WhereGet("Contacts", "PhoneNo", req.body.PhoneNo);
    if (check) {
      await dataHandling.Create("Contacts", req.body)
      return res.json(true)
    } else {
      return res.json("Contact with same number already exists !")
  
    }
  
  }
  async function Update(req, res) {
    req.body.index = Date.now();
    const check = await dataHandling.WhereGet("Contacts", "PhoneNo", req.body.PhoneNo, req.body.DocId);
    if (check) {
      await dataHandling.Update("Contacts", req.body, req.body.DocId)
      return res.json(true)
    } else {
      return res.json("Contact with same number already exists !")
    }
  }
  async function Delete(req, res) {
    const lead = await db.collection("Lead").where("ContactId", "==", req.body.DocId).limit(1).get();
    if (lead.size === 0) {
      await dataHandling.Delete("Contacts", req.body.DocId)
      return res.json(true)
    } else {
      return res.json("Cannot Delete This Contact At This Moment :(")
    }
  
  }
  
  async function Read(req, res) {
    const data = await dataHandling.Read("Contacts", req.body.DocId, req.body.index, req.body.Keyword);
    return res.json(data)
  }

  
  module.exports = {
    Create,
    Update,
    Delete,
    Read
  }