import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import { publicGateway } from '../services/gateway';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './ProductDetails.css';
import Sidebar from '../components/Sidebar';
import Analytics from './StaffAnalytics';

const ProductDetails = () => {
  const [activeOption, setActiveOption] = useState('assignedStaff');
  const [product, setProduct] = useState({});
  const [staffs, setStaffs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation()
  const [data, setData] = useState([]); 


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    console.log(location.state.ProductId,"bkaaaaaaaaaaaaaaaaaaaaaaaa");

    publicGateway
      .post('/product/ViewProducts',{DocId:location.state.ProductId},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      publicGateway
      .post('/product/ViewAssignedStaffs',{ProductId:location.state.ProductId},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setStaffs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      publicGateway
      .post('/product/GetAnalyticsOfProduct',{ProductId:location.state.ProductId},{
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

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleAssignStaffClick = () => {
    navigate('/assignStaff');
  };

  return (
    <Sidebar>
    <div>
      <div className="product-details-container">
        <div className="product-profile">
          <div className="profile-info">
            <div className="product-photos">
              <img
                src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=398&q=80"
                alt="Product 1"
                className="product-photo"
              />
              <img
                src="https://images.unsplash.com/photo-1542272605-15bd6a2bd4f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Product 2"
                className="product-photo"
              />
              <img
                src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=398&q=80"
                alt="Product 3"
                className="product-photo"
              />
            </div>
            <div className="profile-details">
              <h2>{product.Name}</h2>
              <p>{product.Description}</p>
            </div>
          </div>
          
        </div>

        <div className="product-nav">
          <ul>
            <li
              className={activeOption === 'assignedStaff' ? 'active' : ''}
              onClick={() => handleOptionClick('assignedStaff')}
            >
              Assigned Staff
            </li>
            <li
              className={activeOption === 'productAnalytics' ? 'active' : ''}
              onClick={() => handleOptionClick('productAnalytics')}
            >
              Product Analytics
            </li>
          </ul>
        </div>
      </div>

      <div className="product-details">
        {activeOption === 'assignedStaff' && (
          <div>
            <h3>Assigned Staff</h3>
            
            {staffs.map((staff, index) => (
            <div className="staff-card1">
              <p>{staff.Name}</p>
            </div>
    ))}

          </div>
        )}
        {activeOption === 'productAnalytics' && (
          <div>
          <p><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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

export default ProductDetails;
