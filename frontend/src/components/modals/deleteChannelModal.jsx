import React from 'react';
import { deleteChannelApi } from '../../Api/channels.js';
import { useSelector } from 'react-redux';
import { getChannels } from '../../Api/channels.js';

const DeleteChannelModal = ({
  showModal,
  handleClose,
  channelName,
  channelId,
}) => {
  const token = useSelector((state) => state.auth.token);

  const handleDeleteClick = async () => {
    try {
      await deleteChannelApi(channelId, token);

      handleClose();
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
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
              <h5 className="modal-title">Удалить канал</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>Вы уверены, что хотите удалить канал "{channelName}"?</p>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleClose}
                >
                  Отменить
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteClick} 
                >
                  Удалить
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
