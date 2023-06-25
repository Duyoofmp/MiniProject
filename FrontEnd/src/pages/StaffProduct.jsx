import React from 'react';
import StaffSidebar from '../components/StaffSidebar';
import { useNavigate } from 'react-router-dom';

function StaffProduct({ product }) {
  const navigate = useNavigate();

  const navigateToPage = (productObj) => {
    navigate('/staffDashboard', { state: productObj });
  };

  return (
    <StaffSidebar>
      <div className='staff'>
        <h1 className='h2'>Assigned Tasks</h1>
      </div>
      <div className="product-page">
        <table border={5} width={1000} cellPadding={20}>
          <tr height={70}>
            <th>Number</th>
            <th>Name</th>
            <th>Id</th>
            <th>View product</th>
          </tr>
          <tr height={50}>
            <td>1</td>
            <td>Vlsi banglore</td>
            <td>vlsi banglore</td>
            <td><button onClick={() => navigateToPage(product)}>click</button></td>
          </tr>
          {/* Rest of the table rows */}
        </table>
      </div>
    </StaffSidebar>
  );
}

export default StaffProduct;
