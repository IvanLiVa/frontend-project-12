import React from 'react';
import { Dropdown } from 'react-bootstrap';
import useToggleModal from '../../hooks/useAddChannelModal.js';
import getModal from '../modals/index.js';
import { useTranslation } from 'react-i18next';

const ItemChannel = ({ channel, isActive, onClick }) => {
  const { t } = useTranslation();
  const { showModal, openModal, closeModal, modalData, setModalData } =
    useToggleModal();

  const handleEditClick = () => {
    setModalData({ type: 'edit', channel });
    openModal();
  };

  const handleDeleteClick = () => {
    setModalData({ type: 'delete', channel });
    console.log(channel);
    openModal();
  };

  const ModalComponent = modalData ? getModal(modalData.type) : null;

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
              <span className="visually-hidden">{t('Управление каналом')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleDeleteClick}>
                {t('modals.delete')}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleEditClick}>
                {t('modals.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {ModalComponent && (
        <ModalComponent
          showModal={showModal}
          handleClose={closeModal}
          channel={modalData.channel}
        />
      )}
    </li>
  );
};

export default ItemChannel;
