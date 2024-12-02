import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setChannels,
  setActiveChannelId,
} from '../../store/slices/channelsSlice.js';
import { getChannels } from '../../Api/channels.js';
import AddChannelModal from '../modals/addChannelModal.jsx';
import ItemChannel from './ItemChannel';
import SocketApi from '../../Api/socket.js';
import {
  addChannel,
  updateChannel,
  removeChannel,
} from '../../store/slices/channelsSlice.js';
import { removeMessagesByChannelId } from '../../store/slices/messagesSlice.js';
import { useToggleModal } from '../../hooks/useAddChannelModal';
import { useTranslation } from 'react-i18next';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannelId
  );
  const token = useSelector((state) => state.auth.token);

  const { showModal, openModal, closeModal } = useToggleModal();

  useEffect(() => {
    if (token) {
      getChannels(token)
        .then((data) => {
          dispatch(setChannels(data));
        })
        .catch((error) => console.error('Ошибка загрузки каналов:', error));

      SocketApi.createConnection();

      SocketApi.onNewChannel(dispatch, addChannel);
      SocketApi.onRenameChannel(dispatch, updateChannel);
      SocketApi.onRemoveChannel(
        dispatch,
        removeChannel,
        removeMessagesByChannelId
      );

      return () => {
        if (SocketApi.socket) {
          SocketApi.socket.disconnect();
        }
      };
    }
  }, [token, dispatch]);

  const handleChannelClick = (id) => {
    dispatch(setActiveChannelId(id));
  };

  return (
    <>
      <div className="col-2 bg-light p-3 border-end">
        <div className="d-flex align-items-center mb-3">
          <b className="me-auto">{t('text.channels')}</b>
          <button
            type="button"
            className="btn btn-sm btn-add-channel"
            onClick={openModal}
          >
            +
          </button>
        </div>
        <ul className="nav flex-column">
          {channels.map((channel) => (
            <ItemChannel
              key={channel.id}
              channel={channel}
              isActive={activeChannelId === channel.id}
              onClick={handleChannelClick}
            />
          ))}
        </ul>
      </div>
      {showModal && (
        <AddChannelModal showModal={showModal} handleClose={closeModal} />
      )}
    </>
  );
};

export default Channels;
