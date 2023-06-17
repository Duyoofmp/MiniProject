import React, { useState } from 'react';
import './assignContact.css';
import { publicGateway } from '../services/gateway';

import { useNavigate ,useLocation} from 'react-router-dom';


const ContactList = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const [contacts,setContacts]=useState([]);
  const location = useLocation()
    
  const navigate = useNavigate();

  const handleContactSelect = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((id) => id !== contactId)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contactId,
      ]);
    }
  };

  const handleAssignTask = () => {
    // Perform the action of assigning the task to the selected contacts
    const token = localStorage.getItem('accessToken');
    console.log(token);
    publicGateway
      .post('/product/AssignProduct',{ ProductId: location.state.ProductId,StaffId:location.state.StaffId,ContactIds:selectedContacts },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        if(res.data===true){
alert("Task Assigned Successfully :)")
        }else{
alert("Error Occured ! ")

        }
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/')

    console.log('Assigning task to contacts:', selectedContacts);
  };

  return (
    <div className="contact-list-container">
      <h2>Contact List</h2>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.DocId}
            className={`contact-item ${
              selectedContacts.includes(contact.DocId) ? 'selected' : ''
            }`}
            onClick={() => handleContactSelect(contact.DocId)}
          >
            <div className="contact-details">
              <p className="contact-name">{contact.Name}</p>
              <p className="contact-name">{contact.Category}</p>
              <p className="contact-email">{contact.Email}</p>
            </div>
            {selectedContacts.includes(contact.DocId) && (
              <div className="contact-tick">&#10004;</div>
            )}
          </li>
        ))}
      </ul>
      <button
        className="assign-task-button"
        disabled={selectedContacts.length === 0}
        onClick={handleAssignTask}
      >
        Assign Task
      </button>
    </div>
  );
};

export default ContactList;
