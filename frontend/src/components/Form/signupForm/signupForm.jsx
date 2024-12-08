import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Input from '../../Input/Input.jsx';
import './signupForm.css';
import { addUser } from '../../../Api/auth.js';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: '',
  password: '',
  confirmPass: '',
};

const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, t('validation.username'))
      .max(20, t('validation.username'))
      .required(t('validation.required')),
    password: Yup.string().min(6, t('validation.password')).required(t('validation.required')),
    confirmPass: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordMatch'))
      .required(t('validation.required')),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const response = await addUser(values.firstName, values.password);
      const { token, username } = response.data;
      localStorage.setItem('user', JSON.stringify({ token, username }));
      navigate('/');
    } catch (error) {
      setFieldError('general', t('validation.userExists'));
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
            labelKey="signup.username"
            name="firstName"
            id="firstName"
            placeholderKey="signup.usernamePlaceholder"
          />

          <Input
            labelKey="signup.password"
            name="password"
            id="password"
            placeholderKey="signup.passwordPlaceholder"
            type="password"
          />

          <Input
            labelKey="signup.confirmPassword"
            name="confirmPass"
            id="confirmPass"
            placeholderKey="signup.confirmPasswordPlaceholder"
            type="password"
          />

          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <button type="submit" className="btn btn-primary">
            {t('signup.submit')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
