import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Analytics = () => {
  // Generate random data values
  const assigned = Math.floor(Math.random() * 100) + 1; // Random assigned value between 1 and 100
  const completed = Math.floor(Math.random() * (assigned - 1)) + 1; // Random completed value between 1 and assigned-1
  const accepted = Math.floor(Math.random() * completed); // Random accepted value between 0 and completed
  const rejected = completed - accepted; // Calculate rejected based on completed and accepted

  const data = [
    { name: 'Assigned', data: assigned },
    { name: 'Completed', data: completed },
    { name: 'Rejected', data: rejected },
    { name: 'Accepted', data: accepted },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="data" fill="#8884d8" />
      </BarChart>
    </div>
  );
 
};

export default Analytics;
