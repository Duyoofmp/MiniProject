import React from 'react';
import StaffSidebar from '../components/StaffSidebar';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';




const Comment = () => {
  

    
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
            <tr height={50}>
              <td>1</td>
              <td>Heavy work this week</td>
              <td>Pending</td>
            </tr>
          </table>
        </div>
      </StaffSidebar>
    );
};

export default Comment;