import React, { useState } from 'react';
import { deleteChannelApi } from '../../Api/channels.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-bootstrap';
const DeleteChannelModal = ({ showModal, handleClose, channelId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleDeleteClick = async () => {
    setIsDeleting(true);

    try {
      await deleteChannelApi(channelId, token);
      handleClose();
      toast.success(t('toast.channel_renamed_success'));
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
    } finally {
      setIsDeleting(false);
    }
  };

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
              <div className="modal-title h4">Удалить канал</div>
              <button
                type="button"
                aria-label="Close"
                className="btn btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={handleClose}
                  disabled={isDeleting}
                >
                  Отменить
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Удаление...' : 'Удалить'}
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
