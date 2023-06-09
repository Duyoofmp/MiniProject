const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const common = require('../common')



exports.OnProductCreate = functions.firestore
    .document("Products/{docid}")
    .onCreate(async (change, context) => {
        const docid = context.params.docid;
        const data = change.data()
        const arr = [];
        common.createKeywords(data.Name, arr)
        return await db.collection("Products").doc(docid).update({ Keywords: arr })
    })
exports.OnProductUpdate = functions.firestore
    .document("Products/{docid}")
    .onUpdate(async (change, context) => {
        const docid = context.params.docid;
        const data = change.after.data()
        const arr = [];
        common.createKeywords(data.Name, arr)
        return await db.collection("Products").doc(docid).update({ Keywords: arr })
    })



