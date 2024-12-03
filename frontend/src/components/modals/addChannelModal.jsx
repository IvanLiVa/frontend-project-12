import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { addChannelApi } from '../../Api/channels.js';
import leoProfanity from 'leo-profanity';

const AddChannelModal = ({ showModal, handleClose }) => {
  const token = useSelector((state) => state.auth.token);
  const channels = useSelector((state) => state.channels.channels);

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [containsProfanity, setContainsProfanity] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Имя канала должно содержать минимум 3 символа')
      .max(20, 'Имя канала не может превышать 20 символов')
      .required('Это поле обязательно'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { name } = values;

      const isDuplicate = channels.some(
        (channelItem) =>
          channelItem.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (isDuplicate) {
        setIsDuplicate(true);
        return;
      }
      const filteredName = leoProfanity.clean(name);
      if (filteredName !== name) {
        setContainsProfanity(true);
        return;
      }

      setIsDuplicate(false);
      setContainsProfanity(false);

      try {
        await addChannelApi({ name }, token);
        formik.resetForm();
        handleClose();
      } catch (error) {
        console.error('Ошибка добавления канала:', error.message);
      }
    },
  });

  return (
    <>
      {showModal && <div className="modal-backdrop fade show"></div>}
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
              <h5 className="modal-title">Добавить канал</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
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
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''} ${isDuplicate ? 'is-invalid' : ''} ${containsProfanity ? 'is-invalid' : ''}`}
                    value={formik.values.name}
                    onChange={(e) => {
                      formik.handleChange(e);
                      const name = e.target.value.trim();

                      const duplicateFound = channels.some(
                        (channelItem) =>
                          channelItem.name.trim().toLowerCase() ===
                          name.toLowerCase()
                      );
                      setIsDuplicate(duplicateFound);
                      const filteredName = leoProfanity.clean(name);
                      setContainsProfanity(filteredName !== name);
                    }}
                    onBlur={formik.handleBlur}
                    placeholder="Введите название канала"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                  {isDuplicate && (
                    <div className="invalid-feedback">
                      Канал с таким именем уже существует.
                    </div>
                  )}
                  {containsProfanity && (
                    <div className="invalid-feedback">
                      Имя канала содержит неприемлемые слова.
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleClose}
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isDuplicate || containsProfanity}
                  >
                    Отправить
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

export default AddChannelModal;