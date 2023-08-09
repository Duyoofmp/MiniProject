import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "./ViewChangeRequest.css"
import { useNavigate } from 'react-router-dom';

import { publicGateway } from '../services/gateway';


const ViewChangeRequest = () => {
  const [reports, setReports] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    console.log(token);
    useEffect(() => {
        
        publicGateway
          .post('/manager/ViewChangeRequests', {}, {
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
      const handleAccept = (news) => {
        console.log(news)
        publicGateway
          .post('/manager/AcceptChangeReq', {...news}, {
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
    
    
    return (
        <Sidebar >

        <div>
            <div className='staff' >
                <h1 className='h2'> Change Requests</h1>
            
                
                        
                </div>
                <div className='z'>

                </div>
            <table  border={5} width={1200} cellPadding={20} >
                <tr height={70}>
                    <th>no</th>
                    <th>Requested StaffId</th>
                    <th>ContactId</th>
                    <th>Old ProductId</th>

                    <th>New ProductId</th>
                    <th></th>


                </tr>
                {reports.map((repo, index) => (
              <tr key={repo.DocId} height={70}>
                <td>{index + 1}</td>
                <td>{repo.StaffId}</td>
                <td>{repo.ContactId}</td>
                <td>{repo.ProductId}</td>
                <td>{repo.ChangeProductId}</td>
                <button onClick={() => handleAccept(repo)}>Accept</button>
              </tr>
            ))} 
               
            </table>
        </div>
        </Sidebar>
    );
};

export default ViewChangeRequest;