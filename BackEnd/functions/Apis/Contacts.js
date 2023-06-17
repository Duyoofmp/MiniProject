const functions = require('firebase-functions');
const common=require("../common")



//express portion
const express = require('express');
const cors = require('cors');




const app = express();
app.use(cors({ origin: true }));
app.use(common.decodeIDToken)
///---------------------------------------------------------------


  
  app.post('/CreateContacts', async (req, res) => {
    const Contacts = require("../Services/Contacts");
    return Contacts.Create(req, res);
  })
  
  app.post('/UpdateContacts', async (req, res) => {
    const Contacts = require("../Services/Contacts");
    return Contacts.Update(req, res);
  })
  
  app.post('/DeleteContacts', async (req, res) => {
    const Contacts = require("../Services/Contacts");
    return Contacts.Delete(req, res);
  })
  
  app.post('/ViewContacts', async (req, res) => {
    const Contacts = require("../Services/Contacts");
    return Contacts.Read(req, res);
  })
  


exports.contact = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app);




