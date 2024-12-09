import React from 'react';
import { Dropdown } from 'react-bootstrap';
import EditChannelModal from '../modals/editChannelModal.jsx';
import useToggleModal from '../../hooks/useAddChannelModal.js';
import DeleteChannelModal from '../modals/deleteChannelModal.jsx';

const ItemChannel = ({ channel, isActive, onClick }) => {
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
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group w-100">
        <button
          type="button"
          className={`w-100 rounded-0 text-start text-truncate btn ${isActive ? 'btn-secondary' : ''}`}
          onClick={() => onClick(channel.id)}
        >
          <span className="me-1">#</span>
          <span className="channel-name">{channel.name}</span>
        </button>
        {channel.removable && (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id={`dropdown-${channel.id}`}
              className="flex-grow-0 dropdown-toggle-split btn btn-secondary"
            >
              <span className="visually-hidden">Управление каналом</span>
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

      {/* Модальные окна */}
      {showEditModal && (
        <EditChannelModal
          showModal={showEditModal}
          handleClose={closeEditModal}
          channel={channel}
        />
      )}

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
