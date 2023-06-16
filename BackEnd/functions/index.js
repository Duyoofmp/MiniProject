const admin = require('firebase-admin');

const ServiceAccount = require("./config/ServiceAccount.json")
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount)
});


const LoginForManager = require("./Apis/Manager");
exports.LoginForManager = LoginForManager.LoginForManager;

const LoginForStaff = require("./Apis/Staff");
exports.LoginForStaff = LoginForStaff.LoginForStaff;

const manager = require("./Apis/Manager");
exports.manager = manager.manager;

const staff = require("./Apis/Staff");
exports.staff = staff.staff;

const product = require("./Apis/Products");
exports.product = product.product;














const stafftrigger = require("./triggers/staffs");
exports.OnStaffCreate = stafftrigger.OnStaffCreate;
exports.OnStaffUpdate = stafftrigger.OnStaffUpdate;
