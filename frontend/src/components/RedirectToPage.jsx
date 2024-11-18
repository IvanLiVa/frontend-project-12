/* eslint-disable functional/no-expression-statement, no-unused-expressions */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? navigate('/') : navigate('/login');
  }, [navigate]);

  return null;
};

export default RedirectToPage;
