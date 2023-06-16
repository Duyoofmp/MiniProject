import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './managerStaffDetails.css';

const StaffDetails = () => {
  const [activeOption, setActiveOption] = useState('assignedProducts');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleAssignProductsClick = () => {
    navigate('/assignProduct');
  };

  return (
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
              <h2>IHJAZUL ASLAM AT</h2>
              <p>Age: 22</p>
              <p>Gender: Male</p>
              <p>Contact Number: 1234567890</p>
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
            <div className="product-card1">
              <p>Product 1</p>
            </div>
            <div className="product-card1">
              <p>Product 2</p>
            </div>
          </div>
        )}
        {activeOption === 'completedProducts' && (
          <div>
            <h3>Completed Products</h3>
            <div className="product-card1">
              <p>Product 3</p>
            </div>
            <div className="product-card1">
              <p>Product 4</p>
            </div>
          </div>
        )}
        {activeOption === 'analytics' && (
          <div>
            <h3>Analytics</h3>
            <p>Analytics data goes here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDetails;
