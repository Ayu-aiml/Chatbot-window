'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from './Component/ChatWindow';
import ChatBotIcon from './Component/ChatBotIcon';
import { onAuthStateChangedListener } from './firebase';

const Page = () => {
  const [user, setUser] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
      setShowChatWindow(!!user); // Show chat window if user is authenticated
    });

    return unsubscribe;
  }, []);

  const handleChatOpen = () => {
    setShowChatWindow(true);
  };

  return (
    <div>
      {showChatWindow && user && <ChatWindow />}
      <ChatBotIcon onClick={handleChatOpen} />
    </div>
  );
};

export default Page;