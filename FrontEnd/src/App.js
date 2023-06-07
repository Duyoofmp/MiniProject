import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Managestaff from './pages/ManageStaff';
import ViewReportedIssue from './pages/ViewReportedIssue.jsx';
import ManageContatcs from './pages/ManageContatcs.jsx';
import ManageProducts from './pages/ManageProducts.jsx';
import ViewChangeRequest from './pages/ViewChangeRequest.jsx';
import ViewRankList from './pages/ViewRankList.jsx';


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
        </Routes>
    </BrowserRouter>
  );
};

export default App;