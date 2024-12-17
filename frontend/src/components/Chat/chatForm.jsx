import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import { sendMessage } from '../../Api/messages.js';

const validationSchema = Yup.object({
  message: Yup.string()
    .min(1),  
});

const FormChat = () => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const username = useSelector((state) => state.auth.username);
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [activeChannelId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const filteredMessage = leoProfanity.clean(values.message);
    try {
      await sendMessage(filteredMessage, activeChannelId, username, token);
      resetForm(); 
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);  
    }
  };

  return (
    <div className="mt-auto px-2 py-2">
      <Formik
        initialValues={{ message: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
          <Form className="py-1 border rounded-2">
            <div className="d-flex w-100">
              <Field
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label={t('text.newMessagePlaceholder')}
                placeholder={t('text.newMessagePlaceholder')}
                className="border-2 p-0 ps-2 form-control flex-grow-1"
                disabled={isSubmitting}
                innerRef={messageInputRef}
              />
              <button
                type="submit"
                className="btn btn-outline-primary ms-2"
                style={{ width: '20%' }}
                disabled={isSubmitting || !values.message.trim()}
              >
                {isSubmitting ? t('text.sending') : t('text.sendButton')}
              </button>
            </div>
            {touched.message && errors.message && (
              <div className="text-danger mt-2">{errors.message}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormChat;
