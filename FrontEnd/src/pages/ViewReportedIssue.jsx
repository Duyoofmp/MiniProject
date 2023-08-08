import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';

const ViewReportedIssue = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [reportedIssues, setReportedIssues] = useState([]);
  const token = localStorage.getItem('accessToken');
  
  useEffect(() => {
    publicGateway
      .post('/report/ViewReports', {}, {
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

  const handleAccept = (issueId) => {
    publicGateway
      .post('/report/UpdateReport', { DocId:issueId,Status: "Accept" }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(true);
        window.location.reload();

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (issueId) => {
    publicGateway
      .post('/report/DeleteReport', { DocId: issueId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterData = (data) => {
    if (filterStatus === 'Open') {
      return data.filter((item) => item.Status === 'Open');
    } else if (filterStatus === 'Closed') {
      return data.filter((item) => item.Status === 'Closed');
    }
    return data;
  };

  const filteredIssues = filterData(reportedIssues);

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
        </div>
        <table border={5} width={1200} cellPadding={20}>
          <thead>
            <tr height={70}>
              <th>No.</th>
              <th>Issue</th>
              <th>Reported StaffId</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue, index) => (
              <tr key={issue.id} height={70}>
                <td>{index + 1}</td>
                <td>{issue.DocId}</td>
                <td>{issue.StaffId}</td>
                <td>{issue.Status}</td>
                <td>{issue.Date}</td>
                <td>
                  {issue.Status === 'Pending' ? (
                    <button onClick={() => handleAccept(issue.DocId)}>Accept</button>
                  ) : (
                    <button onClick={() => handleDelete(issue.DocId)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sidebar>
  );
};

export default ViewReportedIssue;
