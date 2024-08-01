// src/Component/SignIn.js

import React from 'react';
import styled from 'styled-components';
import { signInWithGoogle } from '../firebase'; // Ensure you have this function in your firebase.js

const SignInContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #4CAF50, #8BC34A); // Gradient background
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SignInBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const SignInButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const SignIn = ({ onSignIn }) => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      onSignIn(); // Callback to close the sign-in window after successful login
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <SignInContainer>
      <SignInBox>
        <h2>Sign In</h2>
        <SignInButton onClick={handleSignIn}>Sign in with Google</SignInButton>
      </SignInBox>
    </SignInContainer>
  );
};

export default SignIn;
