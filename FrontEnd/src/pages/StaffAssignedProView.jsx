import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StaffAssignedProView.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { publicGateway } from '../services/gateway';
import Sidebar from '../components/Sidebar';
import StaffSidebar from '../components/StaffSidebar';

const StaffAssignedProView = () => {
  const [productDetails, setProductDetails] = useState({});
  const [assignedContacts, setAssignedContacts] = useState([]);
  const [acceptedContacts, setAcceptedContacts] = useState([]);
  const [rejectedContacts, setRejectedContacts] = useState([]);
  const [changeRequestedProduct, setChangeRequestedProduct] = useState([]);

  
  const [dropDownPro, setDropDowPro] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState({});

  
  const [analyticsData, setAnalyticsData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchProductDetails = async () => {
      try {
        const productResponse = await publicGateway.post('/product/ViewProducts', {
          DocId: location.state.ProductId
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setProductDetails(productResponse.data);

        const assignedContactsResponse = await publicGateway.post('/product/GetAssignedContacts', {
          ProductId: location.state.ProductId, Status: "Open"
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setAssignedContacts(assignedContactsResponse.data);

        const acceptedContactsResponse = await publicGateway.post('/product/GetAssignedContacts', {
          ProductId: location.state.ProductId, Status: "Accepted"
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setAcceptedContacts(acceptedContactsResponse.data);

        const rejectedContactsResponse = await publicGateway.post('/product/GetAssignedContacts', {
          ProductId: location.state.ProductId, Status: "Rejected"
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setRejectedContacts(rejectedContactsResponse.data);
        const changeRested = await publicGateway.post('/product/GetAssignedContacts', {
          ProductId: location.state.ProductId, Status: "ChangeProduct"
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setChangeRequestedProduct(changeRested.data);

        const dropProducts = await publicGateway.post('/product/ViewProducts', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setDropDowPro(dropProducts.data);

        const analyticsResponse = await publicGateway.post('/product/GetAnalyticsOfProduct', {
          ProductId: location.state.ProductId
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { Assigned, Completed, Rejected, Accepted,ChangeRequested } = analyticsResponse.data;

        setAnalyticsData([
          { name: 'Assigned', data: Assigned },
          { name: 'Completed', data: Completed },
          { name: 'Rejected', data: Rejected },
          { name: 'Accepted', data: Accepted },
          { name: 'ChangeRequested', data: ChangeRequested },

          
          
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [location.state.ProductId]);

  const [activeOption, setActiveOption] = useState('productDetails');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const [selectedProgress, setSelectedProgress] = useState({});

  const handleUpdateProgress = (contactId, progress) => {
    setSelectedProgress((prevSelectedProgress) => ({
      ...prevSelectedProgress,
      [contactId]: progress,
    }));
  };
  const handleUpdateButton = async (productId, contactId, progress, changeProductId) => {
    try {
      console.log(changeProductId,"fuyojhihinh")
      const token = localStorage.getItem('accessToken');
      

      await publicGateway.post('/staff/updateLead', {
        ProductId: productId,
        ContactId: contactId,
        Status: progress,
        ChangeProductId: changeProductId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  

  const [selectedProducts, setSelectedProducts] = useState({});

  const handleProductChange = (contactId, product) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [contactId]: product,
    }));
  };

  return (
    <StaffSidebar>
      <div className="product-details-container">
        <div className="product-profile">
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Product"
            className="product-photo"
          />
          <div className="profile-info">
            <h2>{productDetails.Name}</h2>
            <p>Name: {productDetails.Name}</p>
            <p>Description: {productDetails.Description}</p>
            <p>Price: {productDetails.Price}</p>
          </div>
        </div>

        <div className="product-nav">
          <ul>
            <li
              className={activeOption === 'assignedContacts' ? 'active' : ''}
              onClick={() => handleOptionClick('assignedContacts')}
            >
              Assigned Contacts
            </li>
            <li
              className={activeOption === 'acceptedContacts' ? 'active' : ''}
              onClick={() => handleOptionClick('acceptedContacts')}
            >
              Accepted Contacts
            </li>
            <li
              className={activeOption === 'rejectedContacts' ? 'active' : ''}
              onClick={() => handleOptionClick('rejectedContacts')}
            >
              Rejected Contacts
            </li>
            <li
              className={activeOption === 'changeRequestedProduct' ? 'active' : ''}
              onClick={() => handleOptionClick('changeRequestedProduct')}
            >
              Change Requested Products
            </li>
            <li
              className={activeOption === 'analytics' ? 'active' : ''}
              onClick={() => handleOptionClick('analytics')}
            >
              Product Analytics
            </li>
          </ul>
        </div>

        <div className="product-details">
          {activeOption === 'assignedContacts' && (
            <div>
              <h3>Assigned Contacts</h3>
              {assignedContacts.length === 0 ? (
                <p>No assigned contacts.</p>
              ) : (
                assignedContacts.map((contact) => (
                  <div key={contact.DocId} className="contact-card">
                    <p>Name: {contact.Name}</p>
                    <p>Email: {contact.Email}</p>
                    <p>Phone No: {contact.PhoneNo}</p>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name={`progress-${contact.DocId}`}
                          value="Accepted"
                          checked={selectedProgress[contact.DocId] === 'Accepted'}
                          onChange={() => handleUpdateProgress(contact.DocId, "Accepted")}
                        />
                        Accepted
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`progress-${contact.DocId}`}
                          value="Rejected"
                          checked={selectedProgress[contact.DocId] === 'Rejected'}
                          onChange={() => handleUpdateProgress(contact.DocId, "Rejected")}
                        />
                        Rejected
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`progress-${contact.DocId}`}
                          value="ChangeProduct"
                          checked={selectedProgress[contact.DocId] === 'ChangeProduct'}
                          onChange={() => handleUpdateProgress(contact.DocId, "ChangeProduct")}
                        />
                        Change Product
                      </label>
                      {selectedProgress[contact.DocId] === 'ChangeProduct' && (
                        <div>
                          <select
                            value={selectedProducts[contact.DocId] || 'Select'}
                            onChange={(e) => {
                              handleProductChange(contact.DocId, e.target.value);
                              setSelectedProductIds((prevSelectedProductIds) => ({
                                ...prevSelectedProductIds,
                                [contact.DocId]: dropDownPro.find(product => product.Name === e.target.value)?.DocId,
                              }));
                            }}
                          >
                            <option value="Select" disabled>
                              Select Product
                            </option>
                            {dropDownPro.map((product) => (
                              <option key={product.DocId} value={product.Name}>
                                {product.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <button onClick={() => handleUpdateButton(location.state.ProductId, contact.DocId, selectedProgress[contact.DocId], selectedProductIds[contact.DocId])}>
                        Update
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeOption === 'acceptedContacts' && (
            <div>
              <h3>Accepted Contacts</h3>
              {acceptedContacts.length === 0 ? (
                <p>No accepted contacts.</p>
              ) : (
                acceptedContacts.map((contact) => (
                  <div key={contact.DocId} className="contact-card">
                    <p>Name: {contact.Name}</p>
                    <p>Email: {contact.Email}</p>
                    <p>Phone No: {contact.PhoneNo}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeOption === 'rejectedContacts' && (
            <div>
              <h3>Rejected Contacts</h3>
              {rejectedContacts.length === 0 ? (
                <p>No rejected contacts.</p>
              ) : (
                rejectedContacts.map((contact) => (
                  <div key={contact.DocId} className="contact-card">
                    <p>Name: {contact.Name}</p>
                    <p>Email: {contact.Email}</p>
                    <p>Phone No: {contact.PhoneNo}</p>
                  </div>
                ))
              )}
            </div>
          )}
          {activeOption === 'changeRequestedProduct' && (
            <div>
              <h3>changeRequestedProduct</h3>
              {changeRequestedProduct.length === 0 ? (
                <p>No changeRequestedProduct</p>
              ) : (
                changeRequestedProduct.map((contact) => (
                  <div key={contact.DocId} className="contact-card">
                    <p>Name: {contact.Name}</p>
                    <p>Email: {contact.Email}</p>
                    <p>Phone No: {contact.PhoneNo}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeOption === 'analytics' && (
            <div>
              <h3>Analytics</h3>
              <div className="analytics-chart">
                <BarChart width={800} height={400} data={analyticsData}>
                  <CartesianGrid strokeDasharray="9 9" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="data" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          )}
        </div>
      </div>
    </StaffSidebar>
  );
};

export default StaffAssignedProView;
