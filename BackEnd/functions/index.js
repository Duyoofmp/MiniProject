const manager = require("./Apis/Manager");
exports.manager = manager.manager;

const staff = require("./Apis/Staff");
exports.staff = staff.staff;














const stafftrigger = require("./triggers/staffs");
exports.OnStaffCreate = stafftrigger.OnStaffCreate;
exports.OnStaffUpdate = stafftrigger.OnStaffUpdate;
exports.OnStaffDelete = stafftrigger.OnStaffDelete;
