import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = ({ label, name, id, placeholder, type = 'text', className }) => {
  return (
    <div className="mb-3">
      <div className="form-floating">
        <Field
          name={name}
          id={id}
          placeholder={placeholder}
          type={type}
          className={`form-control ${className}`}
        />
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      </div>

      <ErrorMessage name={name}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Input;
