/* eslint-disable functional/no-expression-statement, no-param-reassign */

import './loginForm.css';
import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../Input/Input.jsx';
import { fetchDataLogin } from '../../Api/auth.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (values, { setFieldError }) => {
    fetchDataLogin(values.firstName, values.password)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify({ token: data.token, username: data.username }));
        navigate('/');
      })
      .catch((error) => {
        console.error('Ошибка авторизации:', error);
        setFieldError('general', t('login.errors.invalidCredentials'));
      });
  };

  return (
    <Formik initialValues={{ firstName: '', password: '' }} onSubmit={handleSubmit}>
      {({ errors }) => (
        <Form className="form p-5 border rounded shadow-sm mt-5">
          <Input
            labelKey="login.usernameLabel"
            name="firstName"
            id="firstName"
            placeholderKey="login.usernamePlaceholder"
          />

          <Input
            labelKey="login.passwordLabel"
            name="password"
            id="password"
            placeholderKey="login.passwordPlaceholder"
            type="password"
          />

          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <button type="submit" className="btn btn-primary">
            {t('login.submit')}
          </button>
          <div className="mt-3 text-center">
            <span>{t('login.noAccount')} </span>
            <Link to="/signup" className="text-decoration-none">
              {t('login.signupLink')}
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
