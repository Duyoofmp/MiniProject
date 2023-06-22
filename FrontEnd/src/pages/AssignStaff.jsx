import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AssignStaff.css';

const AssignStaff = () => {
  const [selectedStaff, setSelectedStaff] = useState('');
  const [isAssignButtonEnabled, setAssignButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const staffs = [
    { id: 1, name: 'Staff 1' },
    { id: 2, name: 'Staff 2' },
    { id: 3, name: 'Staff 3' },
    { id: 4, name: 'Staff 4' },
    { id: 5, name: 'Staff 5' },
    { id: 6, name: 'Staff 6' },
    { id: 7, name: 'Staff 7' },
    { id: 8, name: 'Staff 8' },
    { id: 9, name: 'Staff 9' },
    { id: 10, name: 'Staff 10' },
    { id: 11, name: 'Staff 11' },
    { id: 12, name: 'Staff 12' },
    { id: 13, name: 'Staff 13' },
    { id: 14, name: 'Staff 14' },
    { id: 15, name: 'Staff 15' },
    // Add more staffs here
  ];

  const handleStaffSelect = (staffId) => {
    setSelectedStaff(staffId);
    setAssignButtonEnabled(true);
  };

  const handleAssignButtonClick = () => {
    // Navigate to the next page or perform desired action
    navigate('/assignContact');
  };

  return (
    <div className="assign-staff-container">
      <h3>Staffs</h3>
      <div className="staff-card-container">
        {staffs.map((staff, index) => (
          <div
            key={staff.id}
            className={`staff-card ${selectedStaff === staff.id ? 'selected' : ''}`}
            onClick={() => handleStaffSelect(staff.id)}
          >
            <p>{`${index + 1}. ${staff.name}`}</p>
          </div>
        ))}
      </div>
      {isAssignButtonEnabled && (
        <button className="assign-button" onClick={handleAssignButtonClick}>
          Assign Contacts
        </button>
      )}
    </div>
  );
};

export default AssignStaff;
