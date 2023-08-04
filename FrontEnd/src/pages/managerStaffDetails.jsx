import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './managerStaffDetails.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { publicGateway } from '../services/gateway';
import Analytics from './StaffAnalytics';
import Sidebar from '../components/Sidebar';


const StaffDetails = () => {
  const [staffDetails, setStaffDetails] = useState({});
  const [openProducts, setOpenProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);

  const [acceptedProducts, setAcceptedProducts] = useState([]);
  const [data, setData] = useState([]); 

  const location = useLocation()
  useEffect(() => {
  
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/manager/ViewStaffs',{StaffId:location.state.StaffId},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        //console.log(res.data);
        setStaffDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      publicGateway
      .post('/staff/GetProductsOfStaff',{StaffId:location.state.StaffId,Status:"Open"},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
       // console.log(res.data);
        setOpenProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      publicGateway
      .post('/staff/GetProductsOfStaff',{StaffId:location.state.StaffId,Status:"Accepted"},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        //console.log(res.data);
        setAcceptedProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      publicGateway
      .post('/staff/GetProductsOfStaff',{StaffId:location.state.StaffId,Status:"Rejected"},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
       // console.log(res.data);
        setRejectedProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      publicGateway
      .post('/staff/GetAnalyticsOfStaff',{StaffId:location.state.StaffId},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data,"fhfvhv");
         setData ( [
          { name: 'Assigned', data: res.data.Assigned },
          { name: 'Completed', data: res.data.Completed },
          { name: 'Rejected', data: res.data.Rejected },
          { name: 'Accepted', data: res.data.Accepted },
        ]);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [activeOption, setActiveOption] = useState('assignedProducts');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleAssignProductsClick = () => {
    navigate('/assignProduct',{state:{StaffId:location.state.StaffId}});
  };

  return (
    <Sidebar>
    <div>
      <div className="customer-details-container">
        <div className="customer-profile">

          <div className="profile-info">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Profile"
              className="profile-photo"
            />
            <div className="profile-details">
              <h2>{staffDetails.Name}</h2>
              <p>Designation: {staffDetails.Designation}</p>

              <p>Email: {staffDetails.Email}</p>
              <p>Contact Number: {staffDetails.PhoneNo}</p>
            </div>
          </div>
          <button className="assign-products-button" onClick={handleAssignProductsClick}>
            Assign Products
          </button>

        </div>

        <div className="customer-nav">
          <ul>
            <li
              className={activeOption === 'assignedProducts' ? 'active' : ''}
              onClick={() => handleOptionClick('assignedProducts')}
            >
              Assigned Products
            </li>
            <li
              className={activeOption === 'completedProducts' ? 'active' : ''}
              onClick={() => handleOptionClick('completedProducts')}
            >
              Completed Products
            </li>
            <li
              className={activeOption === 'rejectedProducts' ? 'active' : ''}
              onClick={() => handleOptionClick('rejectedProducts')}
            >
              Rejected Products
            </li>
            <li
              className={activeOption === 'analytics' ? 'active' : ''}
              onClick={() => handleOptionClick('analytics')}
            >
              Analytics
            </li>
            
          </ul>
        </div>
      </div>

      <div className="customer-details">
        {activeOption === 'assignedProducts' && (
  <div>
    <h3>Assigned Products</h3>
    {openProducts.map((product, index) => (

      <div key={index} className="product-card1">
        <p>{product.Name}</p>
      </div>
    ))}
  </div>
)}
        {activeOption === 'completedProducts' && (
          <div>
            <h3>Completed Products</h3>
            {acceptedProducts.map((product, index) => (
            <div className="product-card1">
              <p>{product.Name}</p>
            </div>
    ))}
           
          </div>
        )}
        {activeOption === 'rejectedProducts' && (
          <div>
            <h3>Rejected Products</h3>
            {rejectedProducts.map((product, index) => (
            <div className="product-card1">
              <p>{product.Name}</p>
            </div>
    ))}
           
          </div>
        )}
        {activeOption === 'analytics' && (
          <div>
            <p> <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="data" fill="#8884d8" />
      </BarChart>
    </div></p>
          </div>
        )}
      </div>
    </div>
    </Sidebar>
  );

};

export default StaffDetails;
