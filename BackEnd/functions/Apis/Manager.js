const functions = require('firebase-functions');
const common=require("../common")






//express portion
const express = require('express');
const cors = require('cors');




const app = express();
app.use(cors({ origin: true }));
app.use(common.decodeIDToken)
///---------------------------------------------------------------


  app.post('/CreateStaff', async (req, res) => {
    const Man = require("../Services/Manager");
    return Man.CreateStaff(req, res);
  })  

  app.post('/ViewStaffs', async (req, res) => {
    const Man = require("../Services/Staff");
    
    return Man.Read(req, res);
  })




exports.manager = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app);



const app3 = express();
app3.use(cors({ origin: true }));
app3.post('/CreateManager', async (req, res) => {
  const Man = require("../Services/Manager");
  return Man.RegisterManager(req, res);
})
app3.post('/LoginManager', async (req, res) => {
    const Man = require("../Services/Manager");
    return Man.LoginManager(req, res);
  })
exports.LoginForManager = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app3);

