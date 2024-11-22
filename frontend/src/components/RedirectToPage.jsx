/* eslint-disable functional/no-expression-statement, no-unused-expressions */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/authSlice.js';
import { useDispatch } from 'react-redux';

const RedirectToPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.token) {
      dispatch(setUser(user));
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate, dispatch]);

  return null;
};
export default RedirectToPage;
