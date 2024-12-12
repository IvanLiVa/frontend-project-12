import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteChannelApi } from '../../Api/channels.js';


const DeleteChannelModal = ({ showModal, handleClose, channel }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);

  const handleDeleteClick = async () => {
    try {
      await deleteChannelApi(channel.id, token);
      handleClose();
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
    }
  };

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
              <div className="modal-title h4">{t('modals.deleteChannel')}</div>
              <button
                type="button"
                aria-label="Close"
                className="btn btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body">
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={handleClose}
                >
                  {t('modals.cancel')}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteClick}
                >
                  {t('modals.delete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteChannelModal;
