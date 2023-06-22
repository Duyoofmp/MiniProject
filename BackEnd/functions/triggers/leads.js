const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const count = require('./AnalyticsTrigger')
const dataHandling = require("../functions")

const moment = require('moment-timezone')

//---------------------------------------------------------------------------------------------
const Counter = require("../distributed_counter");


exports.AssignedProducts = functions.firestore
    .document("Lead/{docid}")
    .onCreate(async (change, context) => {
        functions.logger.log(context.params.docid)
        const ProductId = change.data().ProductId;
        const CampaignId = change.data().CampaignId;
        const counterOperation = new Counter(db.collection("Campaign").doc(CampaignId).collection("AssignedProducts").doc(ProductId), "TotalNo")
        await counterOperation.incrementBy(1);
        const counterOperation1 = new Counter(db.collection("Campaign").doc(CampaignId).collection("AssignedProducts").doc(ProductId), "PendingAndOpen")
        return counterOperation1.incrementBy(1);
    })

exports.AssignedProductsUpdate = functions.firestore
    .document("Lead/{docid}")
    .onUpdate(async (change, context) => {
        const docid = context.params.docid;
        functions.logger.log(docid)
        const temp = [];
        const ProductId = change.after.data().ProductId;
        const NewCampaignId = change.after.data().CampaignId;
        const PrevCampaignId = change.before.data().CampaignId;
        const NewStaffId = change.after.data().StaffId;
        const PrevStaffId = change.before.data().StaffId;
        const conName = change.after.data().Name || "";
        let ChannelId = change.after.data().ChannelId;
        if (ChannelId === undefined) {
            const Cam = await dataHandling.Read("Campaign", NewCampaignId);
            ChannelId = Cam.ChannelId
        }
        if (NewStaffId !== undefined && PrevStaffId === undefined) {

            const proData = await dataHandling.Read("Products", ProductId)
            await dataHandling.pushNotification(`You have a new lead on ${proData.Name}`, `${conName}`, NewStaffId)
            await db.collection("Staffs").doc(NewStaffId).collection("AssignedProducts").doc(ProductId).set({ index: Date.now(), ChannelId: ChannelId }, { merge: true })
            const counterOperation2 = new Counter(db.collection("Staffs").doc(NewStaffId).collection("AssignedProducts").doc(ProductId), "TotalNo")
            await counterOperation2.incrementBy(1);
            const counterOperation3 = new Counter(db.collection("Staffs").doc(NewStaffId).collection("AssignedProducts").doc(ProductId), "PendingAndOpen")
            return counterOperation3.incrementBy(1);
        }


        if (NewStaffId === PrevStaffId) {
            return 0;
        }
        if (NewStaffId !== undefined) {
            const proData = await dataHandling.Read("Products", ProductId)
            await dataHandling.pushNotification(`You have a new lead on ${proData.Name}`, `${conName}`, NewStaffId)
            const counterOperation2 = new Counter(db.collection("Staffs").doc(NewStaffId).collection("AssignedProducts").doc(ProductId), "TotalNo")
            await counterOperation2.incrementBy(1);
        }
        const counterOperation = new Counter(db.collection("Campaign").doc(NewCampaignId).collection("AssignedProducts").doc(ProductId), "TotalNo")
        await counterOperation.incrementBy(1);
        const counterOperation1 = new Counter(db.collection("Campaign").doc(PrevCampaignId).collection("AssignedProducts").doc(ProductId), "TotalNo")
        await counterOperation1.incrementBy(-1);

        if (PrevStaffId !== undefined) {
            const counterOperation3 = new Counter(db.collection("Staffs").doc(PrevStaffId).collection("AssignedProducts").doc(ProductId), "TotalNo")
            return counterOperation3.incrementBy(-1);
        }
        return 0;
    })

exports.OnLeadDelete = functions.firestore
    .document("Lead/{docid}")
    .onDelete(async (change, context) => {
        functions.logger.log(context.params.docid)
        const temp = []
        const data = change.data()
        let ChannelId = change.data().ChannelId;
        if (ChannelId === undefined) {
            const Cam = await dataHandling.Read("Campaign", data.CampaignId);
            ChannelId = Cam.ChannelId
        }
        if (data.Status === "Open") {
            const counterOperation = new Counter(db.collection("Campaign").doc(data.CampaignId).collection("AssignedProducts").doc(data.ProductId), "PendingAndOpen")
            temp.push(counterOperation.incrementBy(-1));
            if (data.StaffId !== undefined) {
                const counterOperation2 = new Counter(db.collection("Staffs").doc(data.StaffId).collection("AssignedProducts").doc(data.ProductId), "PendingAndOpen")
                temp.push(counterOperation2.incrementBy(-1));
            }

        }

        const counterOperation1 = new Counter(db.collection("Campaign").doc(data.CampaignId).collection("AssignedProducts").doc(data.ProductId), "TotalNo")
        temp.push(counterOperation1.incrementBy(-1));
        temp.push(count.AnalyticsToCollection("NoOFLeads", data.Date, data.ProductId, data.StaffId, data.CampaignId, ChannelId, data.TeamId, -1))
        if (data.Status === "Converted") {
            temp.push(count.AnalyticsToCollection("NoOfConvert", data.ConvertedDate, data.ProductId, data.StaffId, data.CampaignId, ChannelId, data.TeamId, -1))
        }
        if (data.Status === "Rejected") {
            temp.push(count.AnalyticsToCollection("NoOfReject", data.RejectedDate, data.ProductId, data.StaffId, data.CampaignId, ChannelId, data.TeamId, -1))
        }


        // NoOfConvert
        // NoOfDays
        // NoOfReject
        // NoOfCalls
        // NoOfFollowUp
        // NoOfRePooled


        if (data.StaffId !== undefined) {
            const counterOperation3 = new Counter(db.collection("Staffs").doc(data.StaffId).collection("AssignedProducts").doc(data.ProductId), "TotalNo")
            temp.push(counterOperation3.incrementBy(-1));
        }
        return await Promise.all(temp)

    })


exports.OnLeadStatusUpdate = functions.firestore
    .document("Lead/{docid}")
    .onUpdate(async (change, context) => {
        functions.logger.log(context.params.docid)
        try {
            const today = moment().tz('Asia/Kolkata');
            const date = today.format('YYYY-MM-DD')
            const temp = [];
            const RejectedDate = change.before.data().RejectedDate;
            const ConvertedDate = change.before.data().ConvertedDate;
            const RePooledDate = change.before.data().RePooledDate;
            const ProductId = change.after.data().ProductId;
            const PrevStaffId = change.before.data().StaffId;
            const NewStatus = change.after.data().Status;
            const PrevStatus = change.before.data().Status;
            let ChannelId = change.before.data().ChannelId;
            const CampaignId = change.before.data().CampaignId;
            const LeadDate = change.before.data().Date;
            const TeamId = change.before.data().TeamId;

            if (ChannelId === undefined) {
                const Cam = await dataHandling.Read("Campaign", CampaignId);
                ChannelId = Cam.ChannelId
            }
            const docid = context.params.docid;
            if (NewStatus !== PrevStatus) {
                if (PrevStatus === "Open" && (NewStatus === "Converted" || NewStatus === "Rejected" || NewStatus === "RePooled")) {
                    const counterOperation = new Counter(db.collection("Campaign").doc(CampaignId).collection("AssignedProducts").doc(ProductId), "PendingAndOpen")
                    temp.push(counterOperation.incrementBy(-1));
                    if (PrevStaffId !== undefined) {
                        const counterOperation2 = new Counter(db.collection("Staffs").doc(PrevStaffId).collection("AssignedProducts").doc(ProductId), "PendingAndOpen")
                        temp.push(counterOperation2.incrementBy(-1));
                    }
                }
                if (NewStatus === "Open" && (PrevStatus === "Converted" || PrevStatus === "Rejected" || PrevStatus === "RePooled")) {
                    const counterOperation = new Counter(db.collection("Campaign").doc(CampaignId).collection("AssignedProducts").doc(ProductId), "PendingAndOpen")
                    temp.push(counterOperation.incrementBy(1));
                    if (PrevStaffId !== undefined) {
                        const counterOperation2 = new Counter(db.collection("Staffs").doc(PrevStaffId).collection("AssignedProducts").doc(ProductId), "PendingAndOpen")
                        temp.push(counterOperation2.incrementBy(1));
                    }
                }
                if (PrevStatus === "Rejected") {
                    temp.push(count.AnalyticsToCollection("NoOfReject", RejectedDate, ProductId, PrevStaffId, CampaignId, ChannelId, TeamId, -1));
                    const PrevRejectReasonId = change.before.data().RejectReasonId;
                    if (PrevRejectReasonId !== undefined && PrevStaffId === change.after.data().StaffId) {
                        const Analytics = require('../Analytics/AnalyticsFunctions');
                        await Analytics.RejectAnalytics(ProductId, PrevStaffId, CampaignId, ChannelId, TeamId, RejectedDate, PrevRejectReasonId, -1, "RejectedLeads");
                    }
                }
                if (PrevStatus === "Converted") {
                    const noofdays = Number(moment(ConvertedDate).diff(moment(LeadDate), 'days'));
                    temp.push(count.AnalyticsToCollection("NoOfConvert", ConvertedDate, ProductId, PrevStaffId, CampaignId, ChannelId, TeamId, -1))
                    temp.push(count.AnalyticsToCollection("NoOfDays", ConvertedDate, ProductId, PrevStaffId, CampaignId, ChannelId, TeamId, -noofdays))

                }
                if (PrevStatus === "RePooled" && (PrevStatus === "Converted" || PrevStatus === "Rejected")) {
                    temp.push(count.AnalyticsToCollection("NoOfRePooled", RePooledDate, ProductId, PrevStaffId, CampaignId, ChannelId, TeamId, -1))
                }
                if (NewStatus === "Converted") {
                    temp.push(db.collection("Lead").doc(docid).update({ "ConvertedDate": date }))
                }
                if (NewStatus === "Rejected") {
                    temp.push(db.collection("Lead").doc(docid).update({ "RejectedDate": date }))
                }
                if (NewStatus === "RePooled") {
                    temp.push(db.collection("Lead").doc(docid).update({ "RePooledDate": date }))
                }
                return Promise.all(temp)
            }
            return 0;
        } catch (error) {

            console.log(error)
        }


    })


exports.OnFollowUpAdded = functions.firestore
    .document("FollowUp/{docid}")
    .onCreate(async (change, context) => {
        functions.logger.log(context.params.docid)
        data = change.data()
        const getData = await db.collection("FollowUp").where("LeadId", "==", data.LeadId).get();
        if (getData.size === 1) {
            await db.collection("Lead").doc(data.LeadId).update({ FirstFollowUp: data.Date })
        }
        if (getData.size === 2) {
            await db.collection("Lead").doc(data.LeadId).update({ SecondFollowUp: data.Date })
        }
        if (getData.size === 3) {
            await db.collection("Lead").doc(data.LeadId).update({ ThirdFollowUp: data.Date })
        }
        if (data.FollowMethod === "Call") {
            const getsData = await db.collection("FollowUp").where("LeadId", "==", data.LeadId).where("FollowMethod", "==", "Call").get();
            if (getsData.size === 1) {
                await db.collection("Lead").doc(data.LeadId).update({ FirstCall: data.Date })
            }
            if (getsData.size === 2) {
                await db.collection("Lead").doc(data.LeadId).update({ SecondCall: data.Date })
            }
            if (getsData.size === 3) {
                await db.collection("Lead").doc(data.LeadId).update({ ThirdCall: data.Date })
            }
        }
    })

exports.scheduledFunctionCrontab = functions.pubsub.schedule('5 0 * * *')
    .timeZone('Asia/Kolkata') // Users can choose timezone - default is America/Los_Angeles
    .onRun(async (context) => {
        const today = moment().tz('Asia/Kolkata');
        const promise = [];
        const diffDate = today.subtract(30, 'd').format('YYYY-MM-DD');
        console.log(diffDate)
        console.log('This will be run every day at 12:05 AM Eastern!');
        const data = await db.collection("Lead").where("Status", "in", ["Pending", "Open"]).where("Date", "==", diffDate).where("NoOfFollowUp", "==", 0).get();
        data.forEach(docs => {
            promise.push(db.collection("Lead").doc(docs.id).update({ Status: "RePooled" }))
        })
        const dataLastFollowUp = await db.collection("Lead").where("Status", "in", ["Pending", "Open"]).where("LastFollowUpDate", "==", diffDate).get();
        dataLastFollowUp.forEach(docs => {
            promise.push(db.collection("Lead").doc(docs.id).update({ Status: "RePooled" }))
        })
        return Promise.all(promise)
    });


