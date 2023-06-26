import React, { useState, useEffect } from 'react';
import './ManagerDashboard.css';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';

const Dashboard = () => {
  const [staffArray, setStaffArray] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post(
        '/manager/ViewStaffs',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        setStaffArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Sidebar>
      <div>
        <div className="a">
          <h1 className="h1">Dashboard</h1>
          <input className='search-bar' type="search" placeholder='Search Staff'/>
          <button>Search</button>
        </div>
        <table border={5} width={1200} cellPadding={20}>
          <tr height={30}>
            <th>Staff name</th>
            <th>Designation</th>
            <th>Email</th>
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
