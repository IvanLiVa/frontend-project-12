import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.token) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return user?.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
