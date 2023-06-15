import React, { useState, useEffect } from 'react';
import './a.css';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';

const Dashboard = () => {
  const [staffArray, setStaffArray] = useState([]);

  useEffect(() => {
    publicGateway
      .post('/manager/ViewStaffs')
      .then((res) => {
        console.log(res.data);
        setStaffArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Sidebar
      name1="Dashboard"
      name2="ManageStaff"
      name3="ViewReportedIssue"
      name4="ManageContatcs"
      name5="ManageProducts"
      name6="ViewChangeRequest"
      name7="ViewRankList"
    >
      <div>
        <div className="a">
          <h1 className="h1">Dashboard</h1>
          <input type="date" />
          <input type="search" />
          <button>search</button>
        </div>
        <table border={5} width={1200} cellPadding={20}>
          <tr height={30}>
            <th>Staff name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Total</th>
            <th>Finished</th>
            <th>Not Finished</th>
          </tr>
          {staffArray.map((staff, index) => (
            <tr key={index} height={70}>
              <td>{staff.Name}</td>
              <td>{staff.Designation}</td>
              <td>{staff.Email}</td>
            </tr>
          ))}
        </table>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
