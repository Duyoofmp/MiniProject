const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const dataHandling = require("../functions")

const moment = require('moment-timezone')

//----------------------------------------------




exports.AssignedProductsUpdate = functions.firestore
    .document("Leads/{docid}")
    .onUpdate(async (change, context) => {
        const docid = context.params.docid;
        functions.logger.log(docid)
        const staffId=change.after.data().StaffId;
        const Status = change.after.data().Status;
        const BStatus = change.before.data().Status;
     if(Status!==BStatus){
        if(Status==="Accepted"){
            const a=await dataHandling.Read("Staffs",staffId)
            if(a!==undefined){
        return await db.collection("Staffs").doc(staffId).update({Rank : a.Rank+1 })
            }

        }
     }
        return 0;
    })
