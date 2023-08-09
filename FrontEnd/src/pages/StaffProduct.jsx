import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicGateway } from '../services/gateway';
import "./ManageProducts.css"
import StaffSidebar from '../components/StaffSidebar';

const ManageProducts = () => {
  const [productMap, setProductMap] = useState({});
  const [filteredProductArray, setFilteredProductArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token, "sertyhgfds");
    publicGateway
      .post('/staff/GetProductsOfStaff', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        const products = res.data.reduce((map, product) => {
          map[product.DocId] = product;
          return map;
        }, {});
        setProductMap(products);
        setFilteredProductArray(Object.values(products));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  const navigateToPage = (productObj) => {
    console.log(productObj.DocId);
    navigate('/staffproductview', { state: { ProductId: productObj.DocId } });
  };

  return (
    <StaffSidebar>
      <div>
        <div className='staff'>
          <h1 className='h2'>Assigned Products</h1>
         
        </div>

        <table border={5} width={1000} cellPadding={20}>
          <thead>
            <tr height={70}>
              <th>Number</th>
              <th>Name</th>
              <th>Id</th>
              <th>View Product</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductArray.map((product, index) => (
              <tr key={product.DocId} height={70}>
                <td>{index + 1}</td>
                <td>{product.Name}</td>
                <td>{product.DocId}</td>
                <td>
                  <button onClick={() => navigateToPage(product)}>click</button>
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </StaffSidebar>
  );
};

export default ManageProducts;
