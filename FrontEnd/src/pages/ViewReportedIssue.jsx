import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';

const ViewReportedIssue = () => {
  const [filterStatus, setFilterStatus] = useState('all'); // State for filter status
  const [reportedIssues, setReportedIssues] = useState([]); // State for filter status
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/report/ViewReports',{},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setReportedIssues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filterData = (data) => {
    if (filterStatus === 'Open') {
      return data.filter((item) => item.Status === 'Open');
    } else if (filterStatus === 'Closed') {
      return data.filter((item) => item.Status === 'Closed');
    }
    return data; // Return all data if no filter applied
  };

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
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
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
          {filteredIssues.map((issue,index) => (
            <tr key={issue.id} height={70}>
              <td>{index+1}</td>
              <td>{issue.DocId}</td>
              <td>{issue.StaffName}</td>
              <td>{issue.StaffEmail}</td>
              <td>{issue.ReportedIssue}</td>
              <td>{issue.Date}</td>
              <td>
                <select >
                  <option selected={issue.Status === 'Open'} value="Open">Open</option>
                  <option selected={issue.Status === 'Closed'}value="Closed">Closed</option>
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
