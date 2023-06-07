import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import Managestaff from './pages/ManageStaff';
import ViewReportedIssue from './pages/ViewReportedIssue.jsx';
import ManageContatcs from './pages/ManageContatcs.jsx';
import ManageProducts from './pages/ManageProducts.jsx';
import ViewChangeRequest from './pages/ViewChangeRequest.jsx';
import ViewRankList from './pages/ViewRankList.jsx';

import StaffDashboard from './pages/StaffDashboard.jsx';
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

          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Managestaff" element={<Managestaff />} />
          <Route path="/ViewReportedIssue" element={<ViewReportedIssue />} />
          <Route path="/ManageProducts" element={<ManageProducts />} />
          <Route path="/ManageContatcs" element={<ManageContatcs />} />
          <Route path="/ViewChangeRequest" element={<ViewChangeRequest />} />
          <Route path="/ViewRankList" element={<ViewRankList />} />

          <Route path="/staffdashboard" element={<StaffDashboard />} />
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