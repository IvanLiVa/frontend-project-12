import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap'; 
import './chat.css';
import Channels from './channels.jsx';
import MessageForm from './message.jsx';

const Chat = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="chat-container d-flex flex-column h-100">
      {loading && (
        <div className="spinner-container">
          <Spinner animation="border" role="status" />
        </div>
      )}
      <div className="d-flex h-100 chat-block">
        <Channels onLoadingComplete={handleLoadingComplete} />
        <MessageForm onLoadingComplete={handleLoadingComplete} />
      </div>
    </div>
  );
};

export default Chat;
