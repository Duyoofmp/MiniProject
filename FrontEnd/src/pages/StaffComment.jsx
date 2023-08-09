import React, { useState, useEffect } from 'react';

import StaffSidebar from '../components/StaffSidebar';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { publicGateway } from '../services/gateway';



const Comment = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/report/ViewReportsOfStaff', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
      setReports(res.data)
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    
    return (
        <StaffSidebar>
        <div className='staff'>
          <h1 className='h2'>Report Issues</h1>
          <NavLink to="/reportIssue" key={1} className="link" activeclassName="active">  <button  className='b' >Report Issue</button>  </NavLink>

        </div>
        <div className="report-page">
          <table border={5} width={1000} cellPadding={20}>
            <tr height={70}>
              <th>Number</th>
              <th>Reported Issues</th>
              <th>Status</th>

            </tr>
            {reports.map((repo, index) => (
            
              <tr key={repo.DocId} height={70}>
                <td>{index + 1}</td>

              <td>{repo.Issue}</td>
              <td>{repo.Status}</td>
            </tr>
            ))}

          </table>
        </div>
      </StaffSidebar>
    );
};

export default Comment;