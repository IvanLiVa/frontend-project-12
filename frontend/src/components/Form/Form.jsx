/* eslint-disable functional/no-expression-statement, no-param-reassign */

import './loginForm.css';
import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../Input/Input.jsx';
import fetchDataLogin from '../../Api/auth.js';
import { setAuthData } from '../../store/slices/authSlice.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setFieldError }) => {
    fetchDataLogin(values.firstName, values.password)
      .then((data) => {
        dispatch(
          setAuthData({ token: data.token, username: values.firstName })
        );
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch((error) => {
        console.error('Ошибка авторизации:', error);
        setFieldError('general', 'Неверные имя пользователя или пароль.');
      });
  };

  return (
    <Formik
      initialValues={{ firstName: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className="form p-5 border rounded shadow-sm mt-5">
          <Input
            label="Имя Пользователя"
            name="firstName"
            id="firstName"
            placeholder="Ваш ник"
          />

          <Input
            label="Пароль"
            name="password"
            id="password"
            placeholder="Введите пароль"
            type="password"
          />

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
