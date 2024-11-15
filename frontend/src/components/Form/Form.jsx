/* eslint-disable functional/no-expression-statement */
import './Form.css';
import React from 'react';
import { Formik, Form } from 'formik';
import initialValues from './helper.js';
import Input from '../Input/Input.jsx';

const CastomFrom = () => {
  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="form">
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
        />
        <button type="submit">Войти</button>
      </Form>
    </Formik>
  );
};

export default CastomFrom;
