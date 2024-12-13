import React, { useState, useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, FormText,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';

const AddModal = ({ onClose, onSubmit, channels }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [isDuplicate, setIsDuplicate] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('modals.from3To20Characters'))
      .max(20, t('modals.from3To20Characters'))
      .required(t('modals.fieldRequired')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: (values) => {
      const channelName = values.name.trim();
      const isChannelDuplicate = channels.some((channel) => channel.name.trim()
       .toLowerCase() === channelName.toLowerCase());

      if (isChannelDuplicate) {
        setIsDuplicate(true);
        return;
      }

      const filteredName = leoProfanity.clean(channelName);
      setIsDuplicate(false);
      onSubmit(filteredName);
      onClose();
    },
  });

  const handleNameChange = (e) => {
    formik.handleChange(e);
    if (isDuplicate) {
      setIsDuplicate(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group mb-3">
            <FormControl
              id="name"
              ref={inputRef}
              className="form-control"
              data-testid="input-name"
              name="name"
              required
              value={formik.values.name}
              onChange={handleNameChange}
              placeholder="Введите имя канала"
            />
            <label className="visually-hidden" htmlFor="name">
              {t('modals.channelName')}
            </label>
            {formik.touched.name && formik.errors.name && (
              <FormText className="text-danger">{formik.errors.name}</FormText>
            )}
            {isDuplicate && (
              <FormText className="text-danger">
                {t('modals.channelNameUnique')}
              </FormText>
            )}
          </FormGroup>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={onClose}
            >
              {t('modals.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              {t('modals.submit')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
