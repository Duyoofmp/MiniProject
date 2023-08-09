import React, { useState } from 'react';
import './StaffProfile.css';
import StaffSidebar from '../components/StaffSidebar';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [designation, setDesignation] = useState('Software Engineer');
  const [email, setEmail] = useState('john.doe@example.com');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('********');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [profileImage, setProfileImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Save the updated profile information here
  };

  const defaultProfileImage =
    'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'; 

  return (
    <StaffSidebar>
      <div className="profile">
        <div className="profile-picture-container">
          {isEditMode ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          ) : (
            <img
              className="profile-picture"
              src={profileImage || defaultProfileImage}
              alt="Profile Picture"
            />
          )}
        </div>
        <h1 className="profile-name">
          {isEditMode ? (
            <input type="text" value={name} onChange={handleNameChange} />
          ) : (
            name
          )}
        </h1>
        <p className="profile-designation">
          {isEditMode ? (
            <input
              type="text"
              value={designation}
              onChange={handleDesignationChange}
            />
          ) : (
            designation
          )}
        </p>
        <ul className="profile-details">
          <li>
            <strong>Email:</strong>{' '}
            {isEditMode ? (
              <input type="email" value={email} onChange={handleEmailChange} />
            ) : (
              email
            )}
          </li>
          <li>
            <strong>Password:</strong>{' '}
            {isEditMode ? (
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
              />
            ) : (
              '******'
            )}
            {isEditMode && (
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPasswordToggle}
              />
            )}
          </li>
          <li>
            <strong>Phone Number:</strong>{' '}
            {isEditMode ? (
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            ) : (
              phoneNumber
            )}
          </li>
        </ul>
        {isEditMode ? (
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        )}
      </div>
    </StaffSidebar>
  );
};

export default Profile;
