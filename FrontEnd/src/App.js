import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import Managestaff from './pages/ManageStaff';
import ViewReportedIssue from './pages/ViewReportedIssue.jsx';
import ManageContatcs from './pages/ManageContatcs.jsx';
import managerStaffDetails from './pages/managerStaffDetails'
import ManageProducts from './pages/ManageProducts.jsx';
import ViewChangeRequest from './pages/ViewChangeRequest.jsx';
import ViewRankList from './pages/ViewRankList.jsx';
import AddStaff from './pages/AddStaff.jsx';
import AddProduct from './pages/AddProduct';
import AddContacts from './pages/AddContacts';

import StaffDashboard from './pages/StaffDashboard.jsx';
import Analytics from './pages/StaffAnalytics.jsx';
import Comment from './pages/StaffComment.jsx';
import Product from './pages/StaffProduct.jsx';
import ProductList from './pages/StaffProductList.jsx';
import Profile from './pages/StaffProfile.jsx';

import Roles from './components/roles';
import EmpLogin from './components/empLogin';
import ManagerSignInOut from './container/SignInOut';
import StaffDetails from './pages/managerStaffDetails';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>

          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Managestaff" element={<Managestaff />} />
          <Route path="/ViewReportedIssue" element={<ViewReportedIssue />} />
          <Route path="/ManageProducts" element={<ManageProducts />} />
          <Route path="/ManageContatcs" element={<ManageContatcs />} />
          <Route path="/managerStaffDetails" element={<StaffDetails/>}/>
          <Route path="/ViewChangeRequest" element={<ViewChangeRequest />} />
          <Route path="/ViewRankList" element={<ViewRankList />} />
          <Route path="/AddStaff" element={<AddStaff />} />
          <Route path="/AddProduct" element={<AddProduct />} />

          <Route path="/AddContacts" element={<AddContacts />} />




          <Route path="/staffdashboard" element={<StaffDashboard />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/profile" element={<Profile />} />
          


          <Route path="/" element={<Roles />} />
          <Route path="/employeeLogin" element={<EmpLogin />} />
          <Route path="/managerlogin" element={<ManagerSignInOut />} />
        
        </Routes>
    </BrowserRouter>
  );
};

export default App;