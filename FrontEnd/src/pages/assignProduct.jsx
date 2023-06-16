import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assignProduct.css';

const AssignProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isAssignButtonEnabled, setAssignButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
    { id: 9, name: 'Product 9' },
    { id: 10, name: 'Product 10' },
    { id: 11, name: 'Product 11' },
    { id: 12, name: 'Product 12' },
    { id: 13, name: 'Product 13' },
    { id: 14, name: 'Product 14' },
    { id: 15, name: 'Product 15' },
    { id: 16, name: 'Product 16' },
    { id: 17, name: 'Product 17' },
    // Add more products here
  ];

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    setAssignButtonEnabled(true);
  };

  const handleAssignButtonClick = () => {
    // Navigate to the next page or perform desired action
    navigate('/assignContact');
  };

  return (
    <div className="assign-product-container">
      <h3>Products</h3>
      <div className="product-card-container">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-card ${
              selectedProduct === product.id ? 'selected' : ''
            }`}
            onClick={() => handleProductSelect(product.id)}
          >
            <p>{product.name}</p>
          </div>
        ))}
      </div>
      {isAssignButtonEnabled && (
        <button className="assign-button" onClick={handleAssignButtonClick}>
          Assign Contacts
        </button>
      )}
    </div>
  );
};

export default AssignProduct;
