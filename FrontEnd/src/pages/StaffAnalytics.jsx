import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicGateway } from '../services/gateway';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StaffSidebar from '../components/StaffSidebar';


const Analytics = () => {
  // Generate random data values
  const [data, setData] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        publicGateway
          .post('/staff/GetAnalyticsOfStaff',{},{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((res) => {
            setData ( [
              { name: 'Assigned', data: res.data.Assigned },
              { name: 'Completed', data: res.data.Completed },
              { name: 'Rejected', data: res.data.Rejected },
              { name: 'Accepted', data: res.data.Accepted },
              { name: 'ChangeRequested', data: res.data.ChangeRequested },


              
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  


  return (
    <StaffSidebar>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <BarChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="data" fill="#8884d8" />
      </BarChart>
    </div>
    </StaffSidebar>
  );
 
};

export default Analytics;
