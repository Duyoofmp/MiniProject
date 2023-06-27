import React, { useState, useEffect } from 'react';

import Sidebar from '../components/Sidebar';

import { NavLink } from 'react-router-dom';
import { publicGateway } from '../services/gateway';
import { useNavigate } from 'react-router-dom';

const ManageContatcs = () => {
    const [contactArray, setContactArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    console.log(token);
    publicGateway
      .post('/contact/ViewContacts',{},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setContactArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const DeleteCon = (contactObj) => {
    const token = localStorage.getItem('accessToken');

    console.log(contactObj.DocId)
    publicGateway
    .post('/contact/DeleteContacts',{DocId:contactObj.DocId},{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const search=async (K)=>{
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post(
        '/contact/ViewContacts',
        {Keyword:K},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        setContactArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }
    return (
        <Sidebar >

        <div>
           

        <div className='staff' >
                <h1 className='h2'>contacts</h1>
                <input onChange={(e) => search(e.target.value)}  type="text" />

                
                        
                </div>

                <NavLink to="/AddContacts" key={1} className="link" activeclassName="active">  <button  className='b' >Add contacts</button>  </NavLink>


        <table border={5} width={1000} cellPadding={20}>
                <tr height={70}>
                <th>No</th>
                    <th>Costumer name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>View Contact</th>


                    
                </tr>
                {contactArray.map((contact, index) => ( 
               <tr key={index} height={70}>
               <td>{index + 1}</td>
               <td>{contact.Name}</td>
               <td>{contact.PhoneNo}</td>
               <td>{contact.Email}</td>
               <td>
                 <button onClick={() => DeleteCon(contact)}>Delete</button>
               </td>
             </tr>
          ))}
              
            </table>
        </div>
        </Sidebar>
    );
};

export default ManageContatcs;