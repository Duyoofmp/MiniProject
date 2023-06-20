import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';
import {  useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const addProduct = () => {
      const productData = {
        Name:name,
        Description :description,
      };
      const token = localStorage.getItem('accessToken');
  
      publicGateway
        .post('/product/CreateProduct', productData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            alert('Error occurred');
          } else {
            alert('Successfully added product');
            setName('');
            setDescription('');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    return (
      <div>
        <form>
          <fieldset>
            <legend>Add Product</legend>
            <label>Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            /><br></br>
            <label>Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              required
              rows="10"
              cols="30"
            /><br></br>
            <input
              onClick={addProduct}
              value="Add Product"
              type="button"
            />
            <input type="reset" />
          </fieldset>
        </form>
      </div>
    );
  };
  
  export default AddProduct;
  
