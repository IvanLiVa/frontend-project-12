import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../Input/Input.jsx';
import './signupForm.css';
import { addUser } from '../../../Api/auth.js';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: '',
  password: '',
  confirmPass: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Имя должно содержать от 3 до 20 символов')
    .max(20, 'Имя должно содержать от 3 до 20 символов')
    .required('Имя обязательно'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Пароль обязателен'),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
});

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const response = await addUser(values.firstName, values.password);
      const { token, username } = response.data;
      localStorage.setItem('user', JSON.stringify({ token, username }));
      navigate('/');
    } catch (error) {
      setFieldError('general', error.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className="form p-5 border rounded shadow-sm mt-5">
          <Input
            label="Имя пользователя"
            name="firstName"
            id="firstName"
            placeholder="Введите имя"
          />

          <Input
            label="Пароль"
            name="password"
            id="password"
            placeholder="Введите пароль"
            type="password"
          />

          <Input
            label="Подтвердите пароль"
            name="confirmPass"
            id="confirmPass"
            placeholder="Подтвердите пароль"
            type="password"
          />

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
