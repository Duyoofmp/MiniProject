import React, { useState, useEffect } from "react";

import './StaffProfile.css';
import StaffSidebar from '../components/StaffSidebar';
import { publicGateway } from "../services/gateway";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [staff, setStaff] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  console.log(token);
  useEffect(() => {

    
    publicGateway
      .post(
        "/staff/ViewStaffs",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setEmail(res.data.Email)
        setName(res.data.Name)

        setDesignation(res.data.Designation)
        setPassword(res.data.Password)
        setPhoneNumber(res.data.PhoneNo)



        setStaff(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
    publicGateway
    .post(
      "/staff/UpdateStaff",
      {Email:email,
      Name:name,
      Designation:designation,
      Password:password,
      PhoneNo:phoneNumber
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(true);
      navigate('/profile',);

      
    })
    .catch((err) => {
      console.log(err);
    });
    setIsEditMode(false);
    // Save the updated profile information here
  };

  const defaultProfileImage =
    'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'; 

  return (
    <StaffSidebar>
      <div className="profile">
        
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
                type={showPassword? "text":"******"}
                value={password}
                onChange={handlePasswordChange}
              />
            ) : (
             password
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
