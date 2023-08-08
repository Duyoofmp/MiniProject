import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';


const ViewRankList = () => {
    const [rankList, setRankList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/staff/RankList', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
      setRankList(res.data)
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
        <Sidebar >

        <div>
            <div className='staff' >
                <h1 className='h2'> Rank Lists</h1>
            
                
                        
                </div>
                <div className='z'>

                </div>
            <table  border={5} width={1200} cellPadding={20} >
            <tr height={70}>
                    <th>Rank</th>
                    <th>Staff Name</th>
                    <th>Staff ID</th>
                    <th>Designation</th>
                    
                </tr>
            {rankList.map((staff, index) => (
            
            <tr key={staff.DocId} height={70}>
              <td>{index + 1}</td>

            <td>{staff.Name}</td>
            <td>{staff.DocId}</td>
            <td>{staff.Designation}</td>

          </tr>
          ))}

               
               
                
            </table>

        </div>
        </Sidebar>
    );
};

export default  ViewRankList;