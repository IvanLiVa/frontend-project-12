import React from 'react';
import { Dropdown } from 'react-bootstrap';
import EditChannelModal from '../modals/editChannelModal.jsx';
import { useToggleModal } from '../../hooks/useAddChannelModal.js';
import DeleteChannelModal from '../modals/deleteChannelModal.jsx';

const ItemChannel = ({ channel, isActive, onClick, onDelete }) => {
  const {
    showModal: showEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useToggleModal();
  const {
    showModal: showDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useToggleModal();

  const handleEditClick = () => {
    openEditModal();
  };

  const handleDeleteClick = () => {
    openDeleteModal();
  };

  return (
    <li className="nav-item">
      <div
        role="group"
        className="d-flex justify-content-between align-items-center"
      >
        <button
          type="button"
          className={`w-100 rounded-0 text-start text-truncate btn btn-link ${isActive ? 'active fw-bold text-decoration-underline' : ''}`}
          onClick={() => onClick(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>

        {channel.removable && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id={`dropdown-${channel.id}`}>
              <i className="bi bi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleDeleteClick}>
                Удалить
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleEditClick}>
                Переименовать
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {/* Модалка для редактирования канала */}
      {showEditModal && (
        <EditChannelModal
          showModal={showEditModal}
          handleClose={closeEditModal}
          channel={channel} // передаем канал в модалку
        />
      )}

      {/* Модалка для удаления канала */}
      {showDeleteModal && (
        <DeleteChannelModal
          showModal={showDeleteModal}
          handleClose={closeDeleteModal}
          channelName={channel.name}
          channelId={channel.id}
        />
      )}
    </li>
  );
};

export default ItemChannel;