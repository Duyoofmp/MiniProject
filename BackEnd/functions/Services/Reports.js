const functions = require('firebase-functions');

const admin = require('firebase-admin');
const dataHandling = require("../functions")
const db = admin.firestore();
const moment = require('moment-timezone')


async function Create(req, res) {
    req.body.index = Date.now()
    req.body.Date=new Date().toLocaleDateString('en-GB');
      await dataHandling.Create("Report", req.body)
      return res.json(true)
  }
  async function Update(req, res) {
    
      await dataHandling.Update("Report", req.body, req.body.DocId)
      return res.json(true)
   
  }
  async function Delete(req, res) {
    
      await dataHandling.Delete("Report", req.body.DocId)
      return res.json(true)
    
  
  }
  
  async function Read(req, res) {
    const data = await dataHandling.Read("Report", req.body.DocId, req.body.index, req.body.Keyword);
    return res.json(data)
  }
  async function ReadReportsOfStaff(req, res) {
    const data = await dataHandling.Read("Report",undefined,undefined,undefined,1000,["StaffId","==",req.body.StaffId],[false]);
    return res.json(data)
  }


  module.exports = {
    Create,
    Update,
    Delete,
    Read,
    ReadReportsOfStaff
  }