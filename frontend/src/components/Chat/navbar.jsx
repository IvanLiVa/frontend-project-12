import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/slices/authSlice.js';
import LanguageSwitcher from '../ languageSwitcher.jsx';

const NavbarChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    navigate('/login');
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <button
          className="navbar-brand btn btn-link"
          onClick={() => navigate('/')}
        >
          Chat
        </button>
        <div className="d-flex align-items-center ml-auto">
          {user.token && (
            <button className="btn btn-danger me-2" onClick={handleLogout}>
              Выйти
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavbarChat;
