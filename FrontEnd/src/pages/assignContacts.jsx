import React, { useState } from 'react';
import './assignContact.css';

const ContactList = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const contacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
    { id: 4, name: 'John Doe', email: 'john@example.com' },
    { id: 5, name: 'John Doe', email: 'john@example.com' },
    { id: 6, name: 'John Doe', email: 'john@example.com' },
    { id: 7, name: 'John Doe', email: 'john@example.com' },
    { id: 8, name: 'John Doe', email: 'john@example.com' },
    { id: 9, name: 'John Doe', email: 'john@example.com' },
    { id: 10, name: 'John Doe', email: 'john@example.com' },
    { id: 11, name: 'John Doe', email: 'john@example.com' },
    { id: 12, name: 'John Doe', email: 'john@example.com' },
    { id: 13, name: 'John Doe', email: 'john@example.com' },
    { id: 14, name: 'John Doe', email: 'john@example.com' },
    { id: 15, name: 'John Doe', email: 'john@example.com' },
    // Add more contacts
  ];

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
    console.log('Assigning task to contacts:', selectedContacts);
  };

  return (
    <div className="contact-list-container">
      <h2>Contact List</h2>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`contact-item ${
              selectedContacts.includes(contact.id) ? 'selected' : ''
            }`}
            onClick={() => handleContactSelect(contact.id)}
          >
            <div className="contact-details">
              <p className="contact-name">{contact.name}</p>
              <p className="contact-email">{contact.email}</p>
            </div>
            {selectedContacts.includes(contact.id) && (
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
