import React from 'react';
import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
