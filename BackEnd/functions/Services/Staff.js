const dataHandling = require("../functions")
const ServiceAccount = require("../config/ServiceAccount.json")
const com = require("../common")
const admin = require('firebase-admin');
const db = admin.firestore();




async function LoginStaff(req, res) {
  try {
    const { Email, Password } = req.body;
    const staffcheck = await dataHandling.Read("Staffs", undefined, undefined, undefined, 1, ["Email", "==", Email, "Password", "==", Password])
    console.log(staffcheck[0].DocId)
    if (staffcheck.length === 1) {
      const token = await com.GenerateToken({ ManagerId: staffcheck[0].ManagerId,StaffId: staffcheck[0].DocId, Role: "Staff", ...req.body })
      return res.json(token)

    } else {
      return res.json(false)
    }
  } catch (error) {
    console.log(error)
    return res.json(false)
  }
}

async function Update(req, res) {
  req.body.index = Date.now()
  await dataHandling.Update("Staffs", req.body, req.body.DocId)
  return res.json(true)
}


async function Read(req, res) {
  console.log(req.body.StaffId)
  const data = await dataHandling.Read("Staffs", req.body.StaffId, req.body.index, req.body.Keyword,1000,["ManagerId","==",req.body.ManagerId]);
  return res.json(data)
}
async function RankList(req, res) {
  console.log(req.body.StaffId,"hgygyugyujg")
  const data = await dataHandling.Read("Staffs", undefined, undefined, undefined,1000,["ManagerId","==",req.body.ManagerId],[true,"Rank","desc"]);
  return res.json(data)
}


async function GetProductsOfStaff(req, res) {
  const temp = [];
  console.log(req.body, "blsdfhjshgsvdbhsjahgdfvhjskhg")
  let pro;
  if (req.body.Status !== undefined) {
    pro = await db.collection("Leads").where("StaffId", "==", req.body.StaffId).where("Status", "==", req.body.Status).get();
  } else {
    pro = await db.collection("Leads").where("StaffId", "==", req.body.StaffId).get();

  }
  pro.forEach(docs => {
    temp.push(dataHandling.Read("Products", docs.data().ProductId))
  })
  return res.json(await Promise.all(temp))
}


async function ContactListOfProduct(req, res) {
  const temp = [];
  let flag = 0;
  const temp1 = [];
  const lead = [];
  const dates = [];

  const ProductId = req.body.ProductId;
  const staffId = req.body.StaffId;
  const Status = req.body.Status;

  let query = db.collection("Leads").where("Status", "==", Status).where("ProductId", "==", ProductId);
  if (staffId !== "") {
    query = query.where("StaffId", "==", staffId);
  }

  if (flag === 0) {
    query = query.orderBy('index', "desc");
  }


  const con = await query.get();
  const staffPromise = [];
  con.forEach(Id => {
    temp.push(db.collection("Contacts").doc((Id.data().ContactId)).get());
    lead.push(Id.id);
    dates.push(Id.data().Date);
    if (staffId === "") {
      staffPromise.push(db.collection("Staffs").doc((Id.data().StaffId)).get());
    }
  })
  const data = await Promise.all(temp);
  const StaffData = await Promise.all(staffPromise);

  data.forEach((docs, index) => {
    const data = { ...docs.data(), LeadId: lead[index], DocId: lead[index], ContactId: docs.id, "Date": dates[index] };
    if (staffId === "") {
      data["StaffName"] = StaffData[index].data().StaffName;
    }
    temp1.push(data);
  })
  return res.json(temp1)
}



async function AnalyticsOfStaff(req, res) {
 
  let assigned;
  let completed;
  let accepted;
  let rejected;
  let change;


  console.log(req.body)

    assigned = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["StaffId","==",req.body.StaffId],[false])
    completed = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["StaffId","==",req.body.StaffId,"Status","!=","Open"],[false])
    rejected = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["StaffId","==",req.body.StaffId,"Status","==","Rejected"],[false])
    accepted = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["StaffId","==",req.body.StaffId,"Status","==","Accepted"],[false])
    change = await dataHandling.Read("Leads", undefined,undefined,undefined,10000,["StaffId","==",req.body.StaffId,"Status","==","ChangeProduct"],[false])

  

  return res.json({Completed:completed.length,Assigned:assigned.length,Rejected:rejected.length,Accepted:accepted.length,ChangeRequested:change.length})
}
async function UpdateLead(req, res) {
console.log(req.body)

dataHandling.Update("Leads",req.body,req.body.ContactId+"_"+req.body.ProductId)
      .then(snap => {
        console.log(true)
          return res.json(true);
      })
      .catch(err => {
        console.log(err)
          return res.json(false);
      })

}



module.exports = {
  LoginStaff,
  Update,
  Read,
  ContactListOfProduct,
  GetProductsOfStaff,
  AnalyticsOfStaff,
  UpdateLead,
  RankList
}