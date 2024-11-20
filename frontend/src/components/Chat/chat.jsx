import React from 'react';
import './chat.css';
import Channels from './channels.jsx';
import MessageForm from './message.jsx';
import NavbarChat from './navbar.jsx';

const Chat = () => {
  return (
    <div className="chat-container d-flex flex-column h-100">
      {/* Навигационная панель */}
      <NavbarChat />

      <div className="d-flex h-100 chat-block">
        {/* Левая колонка с каналами */}
        <Channels />

        {/* Основная область чата */}
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
