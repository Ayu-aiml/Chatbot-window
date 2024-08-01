// src/Component/UserInfo.js

import React from 'react';
import styled from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the sign-out icon

const Container = styled.div`
  width: 30%;
  padding: 10px;
  background: linear-gradient(to top right, #d0f0c0, #ffffff);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Info = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    color: #45a049;
  }
`;

const UserInfo = ({ user, onLogout }) => {
  if (!user) return null;

  const { displayName, email, photoURL, customClaims } = user;

  return (
    <Container>
      <ProfilePicture src={photoURL || '/default-avatar.png'} alt="User Photo" />
      <h3>{displayName || 'User'}</h3>
      <p>{email}</p>
      <Info>
        <p>Height: {customClaims?.height || 'N/A'}</p>
        <p>Weight: {customClaims?.weight || 'N/A'}</p>
        {/* Add more personal info as needed */}
      </Info>
      <LogoutButton onClick={onLogout}>
        <FaSignOutAlt size={20} /> Logout
      </LogoutButton>
    </Container>
  );
};

export default UserInfo;
