const functions = require('firebase-functions');

const common=require("../common")


//express portion
const express = require('express');
const cors = require('cors');




const app = express();
app.use(cors({ origin: true }));
//app.use(common.decodeIDToken)
///---------------------------------------------------------------

app.post('/LoginStaff', async (req, res) => {
    const Staff = require("../Services/Staff");
    return Staff.LoginStaff(req, res);
  })

  app.post('/UpdateStaff', async (req, res) => {
    const Staff = require("../Services/Staff");
    return Staff.Update(req, res);
  })

  app.post('/ViewStaffs', async (req, res) => {
    const Staff = require("../Services/Staff");
    return Staff.Read(req, res);
  })
  
  app.post('/GetProductsOfStaff', async (req, res) => {
    const Staff = require("../Services/Staff");
    return Staff.GetProductsOfStaff(req, res);
  })


  app.post('/GetContactsOfProduct', async (req, res) => {
    const Staff = require("../Services/Staff");
    return Staff.ContactListOfProduct(req, res);
  })
  
  app.post('/SetLeadStatus', async (req, res) => {
    const AssignProduct = require("../Services/Products");
    return AssignProduct.SetAStatus(req, res);
  })



exports.staff = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app);



// const app3 = express();
// app3.use(cors({ origin: true }));
// app3.use(common.decodeIDTokenForLogin)
// app3.post('/login', async (req, res) => res.json(await common.loginForAdmins(req, res)))
// exports.LoginForAdmin = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app3);

