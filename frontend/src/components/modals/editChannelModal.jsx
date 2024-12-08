import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { updateChannelApi } from '../../Api/channels.js';

const EditChannelModal = ({ showModal, handleClose, channel }) => {
  const token = useSelector((state) => state.auth.token);
  const channels = useSelector((state) => state.channels.channels);

  const [isDuplicate, setIsDuplicate] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Имя канала должно содержать минимум 3 символа')
      .max(20, 'Имя канала не может превышать 20 символов')
      .required('Это поле обязательно'),
  });

  const checkDuplicate = (name) => {
    const formattedName = name.trim().toLowerCase();
    const duplicateFound = channels.some(
      (channelItem) => channelItem.name.trim().toLowerCase() === formattedName && channelItem.id !== channel.id
    );
    setIsDuplicate(duplicateFound);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (isDuplicate) {
      alert(`Канал с именем "${values.name}" уже существует.`);
      return;
    }

    try {
      await updateChannelApi(channel.id, { name: values.name }, token);
      resetForm();
      handleClose();
    } catch (error) {
      console.error('Ошибка переименования канала:', error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      {showModal && <div className="modal-backdrop fade show" />}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ display: showModal ? 'block' : 'none', zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Переименовать канал</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label visually-hidden">
                    Имя канала
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name ? 'is-invalid' : ''
                    } ${isDuplicate ? 'is-invalid' : ''}`}
                    value={formik.values.name}
                    onChange={(e) => {
                      formik.handleChange(e);
                      checkDuplicate(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    placeholder="Введите новое название канала"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                  {isDuplicate && <div className="invalid-feedback">Канал с таким именем уже существует.</div>}
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>
                    Отменить
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isDuplicate}>
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChannelModal;
