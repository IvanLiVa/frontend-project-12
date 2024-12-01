import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/slices/authSlice.js';

const NavbarChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth); 

  const handleLogout = () => {
    dispatch(clearUser()); 
    localStorage.removeItem('user'); 
    navigate('/login');а
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/">
          Chat
        </a>
        {/* Кнопка "Выйти" выровнена вправо */}
        <div className="ml-auto">
          {user.token ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Выйти
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavbarChat;
