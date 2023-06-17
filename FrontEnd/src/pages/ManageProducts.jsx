import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';
import { publicGateway } from '../services/gateway';
import { useNavigate } from 'react-router-dom';


const ManageProducts = () => {
    const [productArray, setProductArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/product/ViewProducts',{},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setProductArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateToPage = (ProductObj) => {
    console.log(ProductObj.DocId)
    navigate('/managerProductDetails',{state:{ProductId:ProductObj.DocId}});
  };
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
             <div className='staff' >
                <h1 className='h2'>Products</h1>
                <input type="text" />
                <button>search</button>
                
                        
                </div>
                
                <NavLink to="/AddProduct" key={1} className="link" activeclassName="active">  <button  className='b' >Add Products</button>  </NavLink>

            <table border={5} width={1000} cellPadding={20}>
                <tr height={70}>
                    <th>Number</th>
                    <th>name</th>
                    <th>Id</th>
                    <th>Description</th>
                    <th>View Product</th>
                    
                </tr>
                {productArray.map((product, index) => (
                <tr  key={index} height={50}>
                    <td>{index+1}</td>
                    <td>{product.Name}</td>
                    <td>{product.DocId}</td>
                    <td>{product.Description}</td>
                    <td>
                <button onClick={() => navigateToPage(product)}>click</button>
              </td>
                  
                </tr>
                 ))}
            </table>
        </div>
        </Sidebar>
    );
};

export default ManageProducts;