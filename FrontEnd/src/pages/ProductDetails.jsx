import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const [activeOption, setActiveOption] = useState('assignedStaff');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleAssignStaffClick = () => {
    navigate('/assignStaff');
  };

  return (
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
              <h2>Product Name</h2>
              <p>Product Details</p>
            </div>
          </div>
          <button className="assign-staff-button" onClick={handleAssignStaffClick}>
            Assign Staff
          </button>
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
            <div className="staff-card1">
              <p>Staff 1</p>
            </div>
            <div className="staff-card1">
              <p>Staff 2</p>
            </div>
          </div>
        )}
        {activeOption === 'productAnalytics' && (
          <div>
            <h3>Product Analytics</h3>
            <p>Analytics data goes here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
