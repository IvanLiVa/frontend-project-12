import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(true); 
  const dispatch = useDispatch();
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserState(parsedUser);
      const tokenParts = parsedUser?.token?.split('.');
      if (tokenParts?.length !== 3) {
        setIsValid(false); 
        localStorage.removeItem('user');
      } else {
        dispatch(setUser(parsedUser));
      }
    } else {
      setIsValid(false); 
    }
  }, [dispatch]);

  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
