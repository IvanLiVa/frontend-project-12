import React, { useState } from 'react';
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
    <div className="chat-container d-flex flex-column h-100 position-relative">
      {loading && (
        <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
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
