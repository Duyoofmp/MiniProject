import React, { useState,useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import './assignProduct.css';
import { publicGateway } from '../services/gateway';


const AssignProduct = () => {
const [products,setProducts]=useState([])
const [selectedProduct, setSelectedProduct] = useState('');
  const [isAssignButtonEnabled, setAssignButtonEnabled] = useState(false);
  const location = useLocation()

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
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  
  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    setAssignButtonEnabled(true);
  };

  const handleAssignButtonClick = () => {
    // Navigate to the next page or perform desired action
    navigate('/assignContact', { state: { ProductId: selectedProduct,StaffId:location.state.StaffId } });
  };

  return (
    <div className="assign-product-container">
      <h3>Products</h3>
      <div className="product-card-container">
        {products.map((product) => (
          <div
            key={product.DocId}
            className={`product-card ${
              selectedProduct === product.DocId? 'selected' : ''
            }`}
            onClick={() => handleProductSelect(product.DocId)}
          >
            <p>{product.Name}</p>
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
