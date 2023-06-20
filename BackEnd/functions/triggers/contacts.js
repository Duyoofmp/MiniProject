const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const common = require('../common')



exports.OnContactCreate = functions.firestore
    .document("Contacts/{docid}")
    .onCreate(async (change, context) => {
        const docid = context.params.docid;
        const data = change.data()
        const arr = [];
        common.createKeywords(data.Name, arr)
        common.createKeywords(data.PhoneNo, arr)
        return await db.collection("Contacts").doc(docid).update({ Keywords: arr })
    })
exports.OnContactUpdate = functions.firestore
    .document("Contacts/{docid}")
    .onUpdate(async (change, context) => {
        const docid = context.params.docid;
        const data = change.after.data()
        const arr = [];
        common.createKeywords(data.Name, arr)
        common.createKeywords(data.PhoneNo, arr)
        return await db.collection("Contacts").doc(docid).update({ Keywords: arr })
    })



