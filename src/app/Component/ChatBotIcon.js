
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SignIn from './SignIn';
import ChatWindow from './ChatWindow';

const IconButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: none;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #e6f7e6;
  }
`;

const ChatBotIcon = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const chatWindowRef = useRef(null);

  const handleIconClick = () => {
    if (isSignedIn) {
      setShowChatWindow((prev) => !prev); // Toggle chat window
    } else {
      setShowSignIn(true);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowSignIn(false);
    setShowChatWindow(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setShowChatWindow(false);
      }
    };

    if (showChatWindow) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChatWindow]);

  return (
    <>
      {showSignIn && <SignIn onSignIn={handleSignIn} />}
      {showChatWindow && <div ref={chatWindowRef}><ChatWindow /></div>}
      <IconButton onClick={handleIconClick}>
        <img src="https://easuk.co.uk/wp-content/uploads/2023/05/healthcare-01.png" alt="Chatbot Icon" width="40" height="40" />
      </IconButton>
    </>
  );
};

export default ChatBotIcon;
