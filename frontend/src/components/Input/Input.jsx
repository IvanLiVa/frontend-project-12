import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

const Input = ({ labelKey, name, id, placeholderKey, type = 'text', className }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <div className="form-floating">
        <Field
          name={name}
          id={id}
          placeholder={t(placeholderKey)}
          type={type}
          className={`form-control ${className}`}
        />
        <label htmlFor={id} className="form-label">
          {t(labelKey)}
        </label>
      </div>

      <ErrorMessage name={name}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Input;