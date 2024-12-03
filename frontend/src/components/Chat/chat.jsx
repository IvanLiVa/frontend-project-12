import React from 'react';
import './chat.css';
import Channels from './channels.jsx';
import MessageForm from './message.jsx';

const Chat = () => {
  return (
    <div className="chat-container d-flex flex-column h-100">
      <div className="d-flex h-100 chat-block">
        <Channels />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
