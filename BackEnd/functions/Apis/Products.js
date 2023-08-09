const functions = require('firebase-functions');
const common=require("../common")



//express portion
const express = require('express');
const cors = require('cors');




const app = express();
app.use(cors({ origin: true }));
app.use(common.decodeIDToken)
///---------------------------------------------------------------


  
  app.post('/CreateProduct', async (req, res) => {
    const Product = require("../Services/Products");
    return Product.Create(req, res);
  })
  
  app.post('/UpdateProduct', async (req, res) => {
    const Product = require("../Services/Products");
    return Product.Update(req, res);
  })
  
  app.post('/DeleteProduct', async (req, res) => {
    const Product = require("../Services/Products");
    return Product.Delete(req, res);
  })
  
  app.post('/ViewProducts', async (req, res) => {
    const Product = require("../Services/Products");
    return Product.Read(req, res);
  })
  
  
  app.post('/AssignProduct', async (req, res) => {
    const AssignProduct = require("../Services/Products");
    return AssignProduct.AssignProduct(req, res);
  })
  app.post('/ViewAssignedStaffs', async (req, res) => {
    const AssignProduct = require("../Services/Products");
    return AssignProduct.ViewAssignedStaffs(req, res);
  })

  app.post('/GetAnalyticsOfProduct', async (req, res) => {
    const Product = require("../Services/Products");
    return Product.AnalyticsOfProduct(req, res);
  })
  app.post('/GetAssignedContacts', async (req, res) => {
    const Product = require("../Services/Products");
    return Product.GetAssignedContacts(req, res);
  })

  

  

exports.product = functions.runWith({ memory: '128MB' }).region("asia-south1").https.onRequest(app);




