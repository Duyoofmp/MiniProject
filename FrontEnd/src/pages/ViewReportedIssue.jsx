import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const ViewReportedIssue = () => {
  const [filterStatus, setFilterStatus] = useState('all'); // State for filter status

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filterData = (data) => {
    if (filterStatus === 'open') {
      return data.filter((item) => item.status === 'Open');
    } else if (filterStatus === 'closed') {
      return data.filter((item) => item.status === 'Closed');
    }
    return data; // Return all data if no filter applied
  };

  // Sample data for demonstration
  const reportedIssues = [
    { id: 1, issue: 'Login Issue', reportedBy: 'Ihjas', status: 'Open' },
    { id: 2, issue: 'Network Problem', reportedBy: 'John', status: 'Closed' },
    // Add more data as needed
  ];

  const filteredIssues = filterData(reportedIssues); // Apply filter to data

  return (
    <Sidebar
      name1="Dashboard"
      name2="ManageStaff"
      name3="ViewReportedIssue"
      name4="ManageContatcs"
      name5="ManageProducts"
      name6="ViewChangeRequest"
      name7="ViewRankList"
    >
      <div>
        <div className="staff">
          <h1 className="h2">Reported Issues</h1>
          <div>
            <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filterStatus} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <table border={5} width={1200} cellPadding={20}>
          <tr height={70}>
            <th>No.</th>
            <th>Issue</th>
            <th>Reported By</th>
            <th>Status</th>
          </tr>
          {filteredIssues.map((issue) => (
            <tr key={issue.id} height={70}>
              <td>{issue.id}</td>
              <td>{issue.issue}</td>
              <td>{issue.reportedBy}</td>
              <td>
                <select>
                  <option value="Open">Open</option>
                  <option value="Close">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Sidebar>
  );
};

export default ViewReportedIssue;
