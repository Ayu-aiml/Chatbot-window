'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPaperclip, FaFilePdf, FaImage, FaMicrophone, FaExpand, FaCompress } from 'react-icons/fa';
import Message from './Message';
import UserInfo from './UserInfo';
import PastChats from './PastChats';
import { onAuthStateChangedListener, signOutUser } from '../firebase';

const Container = styled.div`
  position: ${(props) => (props.fullscreen ? 'fixed' : 'fixed')};
  top: ${(props) => (props.fullscreen ? '0' : 'auto')};
  left: ${(props) => (props.fullscreen ? '0' : 'auto')};
  bottom: ${(props) => (props.fullscreen ? '0' : '80px')};
  right: ${(props) => (props.fullscreen ? '0' : '20px')};
  width: ${(props) => (props.fullscreen ? '100%' : '80%')};
  height: ${(props) => (props.fullscreen ? '100%' : '70%')};
  display: flex;
  background: linear-gradient(to top right, #d0f0c0, #ffffff);
  border: 2px solid #4CAF50;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
`;

const ChatContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  background-color: #e6f7e6;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  color: #4CAF50;
  position: relative;

  &:hover {
    color: #45a049;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const FullscreenButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #4CAF50;
  z-index: 1100;

  &:hover {
    color: #45a049;
  }
`;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([{ date: new Date(), messages: [{ text: 'Welcome to the chat!', sender: 'bot' }] }]);
  const [user, setUser] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
      if (user) {
        handleSelectChat(chats[0]);
      }
    });

    return unsubscribe;
  }, []);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { text: input, sender: 'user', timestamp: new Date(), photoURL: user.photoURL }];
    setMessages(newMessages);
    setChats(chats.map(chat => chat.date === selectedChat.date ? { ...chat, messages: newMessages } : chat));
    setInput('');
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages || []);
  };

  const handleStartNewChat = () => {
    const newChat = { date: new Date(), messages: [] };
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
    setMessages([]);
  };

  const handleLogout = () => {
    signOutUser().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const handleRecordMic = () => {
    if (!recording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/mp4' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const newMessages = [...messages, { text: '', audio: audioUrl, sender: 'user', timestamp: new Date(), photoURL: user.photoURL }];
          setMessages(newMessages);
          setChats(chats.map(chat => chat.date === selectedChat.date ? { ...chat, messages: newMessages } : chat));
        };

        recorder.start();
        setRecording(true);
      }).catch((error) => {
        console.error('Error accessing microphone:', error);
        alert('Microphone access denied. Please enable microphone access and try again.');
      });
    } else {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleUploadPDF = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploaded PDF:', file);
      // Handle PDF upload logic here
    }
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploaded Image:', file);
      // Handle image upload logic here
    }
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  if (!user) {
    return <div>Please sign in to continue.</div>;
  }

  return (
    <Container fullscreen={fullscreen}>
      <PastChats chats={chats} onSelectChat={handleSelectChat} onStartNewChat={handleStartNewChat} />
      <ChatContainer>
        {selectedChat ? (
          <>
            <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px' }}>
              {messages.map((message, index) => (
                <Message key={index} text={message.text} sender={message.sender} timestamp={message.timestamp} photoURL={message.photoURL} audio={message.audio} />
              ))}
            </div>
            <InputContainer>
              <IconButton onClick={() => setShowDropdown(!showDropdown)}>
                <FaPaperclip size={20} />
                {showDropdown && (
                  <Dropdown>
                    <label htmlFor="pdf-upload">
                      <FaFilePdf size={20} />
                      <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={handleUploadPDF}
                      />
                    </label>
                    <label htmlFor="image-upload">
                      <FaImage size={20} />
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleUploadImage}
                      />
                    </label>
                  </Dropdown>
                )}
              </IconButton>
              <IconButton onClick={handleRecordMic}>
                <FaMicrophone size={20} />
              </IconButton>
              <Input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </InputContainer>
          </>
        ) : (
          <div>Select a chat to start</div>
        )}
      </ChatContainer>
      <UserInfo user={user} onLogout={handleLogout} />
      <FullscreenButton onClick={toggleFullscreen}>
        {fullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
      </FullscreenButton>
    </Container>
  );
};

export default ChatWindow;
