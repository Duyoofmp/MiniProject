const functions = require('firebase-functions');
const common=require("../common")



//express portion
const express = require('express');
const cors = require('cors');




const app = express();
app.use(cors({ origin: true }));
app.use(common.decodeIDToken)
///---------------------------------------------------------------


  
  app.post('/CreateReport', async (req, res) => {
    const Report = require("../Services/Reports");
    return Report.Create(req, res);
  })
  
  app.post('/UpdateReport', async (req, res) => {
    const Report = require("../Services/Reports");
    return Report.Update(req, res);
  })
  
  app.post('/DeleteReport', async (req, res) => {
    const Report = require("../Services/Reports");
    return Report.Delete(req, res);
  })
  
  app.post('/ViewReportsOfStaff', async (req, res) => {
    const Report = require("../Services/Reports");
    return Report.ReadReportsOfStaff(req, res);
  })
  
  
  app.post('/ViewReports', async (req, res) => {
    const Report = require("../Services/Reports");
    return Report.Read(req, res);
  })


exports.report = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app);




