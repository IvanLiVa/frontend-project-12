import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const dispatch = useDispatch();

  if (!user?.token) {
    return <Navigate to="/login" />;
  }

  dispatch(setUser(user));
  return children;
};

export default ProtectedRoute;