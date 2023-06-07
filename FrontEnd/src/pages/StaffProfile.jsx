import React, {useState} from 'react';
import './StaffProfile.css'
import StaffSidebar from '../components/StaffSidebar';

const Profile = () => {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    const [email, setEmail] = useState('john.doe@example.com');
    const [location, setLocation] = useState('New York, USA');
    const [website, setWebsite] = useState('https://www.example.com');
    const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80');
    const [isEditMode, setIsEditMode] = useState(false);
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleBioChange = (e) => {
      setBio(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleLocationChange = (e) => {
      setLocation(e.target.value);
    };
  
    const handleWebsiteChange = (e) => {
      setWebsite(e.target.value);
    };
  
    const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleEditClick = () => {
      setIsEditMode(true);
    };
  
    const handleSaveClick = () => {
      setIsEditMode(false);
      // Save the updated profile information here
    };
  
    return (
      <StaffSidebar>
        <div className="profile">
          <div className="profile-picture-container">
            {isEditMode ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            ) : (
              <img
                className="profile-picture"
                src={profilePicture}
                alt="Profile Picture"
              />
            )}
          </div>
          <h1 className="profile-name">
            {isEditMode ? (
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            ) : (
              name
            )}
          </h1>
          <p className="profile-bio">
            {isEditMode ? (
              <textarea value={bio} onChange={handleBioChange} />
            ) : (
              bio
            )}
          </p>
          <ul className="profile-details">
            <li>
              <strong>Email:</strong>{' '}
              {isEditMode ? (
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              ) : (
                email
              )}
            </li>
            <li>
              <strong>Location:</strong>{' '}
              {isEditMode ? (
                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                />
              ) : (
                location
              )}
            </li>
            <li>
              <strong>Website:</strong>{' '}
              {isEditMode ? (
                <input
                  type="url"
                  value={website}
                  onChange={handleWebsiteChange}
                />
              ) : (
                <a href={website}>{website}</a>
              )}
            </li>
          </ul>
          {isEditMode ? (
            <button className="save-button" onClick={handleSaveClick}>Save</button>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
          )}
        </div>
        </StaffSidebar>
    );
  };
  
  export default Profile;