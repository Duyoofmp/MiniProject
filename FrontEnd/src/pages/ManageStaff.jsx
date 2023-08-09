import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import { publicGateway } from '../services/gateway';
import { useNavigate } from 'react-router-dom';


import './ManageStaff.css';

const Managestaff = () => {
  const [staffArray, setStaffArray] = useState([]);
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/manager/ViewStaffs',{},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setStaffArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const search=async (K)=>{
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post(
        '/manager/ViewStaffs',
        {Keyword:K},
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
  
  }
  const navigateToPage = (staffObj) => {
    console.log(staffObj.DocId)
    navigate('/managerStaffDetails',{state:{StaffId:staffObj.DocId}});
  };

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
        <div className="staff">
          <h1 className="h2">staffs</h1>
          <input onChange={(e) => search(e.target.value)} type="text" placeholder='Search Staff'/>
          
        </div>
          <button className="add-Staff" onClick={()=>{navigate('/AddStaff')}}>Add Staffs</button>
        

        <table border={5} width={1200} cellPadding={20}>
          <tr height={100}>
            <th>no</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Staff Id</th>
            <th>email</th>
            <th>phone number</th>
            <th>View staff details</th>
          </tr>
          {staffArray.map((staff, index) => (
            <tr key={index} height={70}>
              <td>{index + 1}</td>
              <td>{staff.Name}</td>
              <td>{staff.Designation}</td>
              <td>{staff.DocId}</td>
              <td>{staff.Email}</td>
              <td>{staff.PhoneNo}</td>
              <td>
                <button onClick={() => navigateToPage(staff)}>click</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Sidebar>
  );
};

export default Managestaff;
