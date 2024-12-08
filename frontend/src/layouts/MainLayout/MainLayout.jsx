import React from 'react';
import './MainLayout.css';
import Chat from '../../components/Chat/chat.jsx';

const MainLayout = () => (
  <div className="container main-layout">
    <main>
      <Chat />
    </main>
  </div>
);

export default MainLayout;
