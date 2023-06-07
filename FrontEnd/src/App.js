import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/StaffDashboard.jsx';
import Analytics from './pages/StaffAnalytics.jsx';
import Comment from './pages/StaffComment.jsx';
import Product from './pages/StaffProduct.jsx';
import ProductList from './pages/StaffProductList.jsx';
import Profile from './pages/StaffProfile.jsx';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;