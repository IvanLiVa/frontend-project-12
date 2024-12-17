import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './chat.css';
import Channels from './channels.jsx';
import MessageForm from './message.jsx';

const Chat = () => {
  const [channelsLoaded, setChannelsLoaded] = useState(false);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  const allLoaded = channelsLoaded && messagesLoaded;

  return (
    <div className="chat-container d-flex flex-column h-100 position-relative">
      {!allLoaded && (
        <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle w-100 h-100 bg-white">
          <Spinner animation="border" role="status" />
        </div>
      )}
      <div className="d-flex h-100 chat-block">
        <Channels onLoadingComplete={() => setChannelsLoaded(true)} />
        <MessageForm onLoadingComplete={() => setMessagesLoaded(true)} />
      </div>
    </div>
  );
};

export default Chat;
