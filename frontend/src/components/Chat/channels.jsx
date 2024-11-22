import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels, setActiveChannelId } from '../../store/slices/channelsSlice.js';
import getChannels from '../../Api/channels.js';
import cn from 'classnames';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const token = useSelector((state) => state.auth.token);

  // Получение каналов при наличии токена
  useEffect(() => {
    if (token) {
      getChannels(token)
        .then((data) => {
          dispatch(setChannels(data));
        })
        .catch((error) => console.error('Ошибка загрузки каналов:', error));
    }
  }, [token, dispatch]);

  // Установка активного канала
  const handleChannelClick = (id) => {
    dispatch(setActiveChannelId(id)); // Устанавливаем активный канал в Redux
  };

  return (
    <div className="col-2 bg-light p-3 border-end">
      <b>Каналы</b>
      <ul className="nav flex-column">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item">
            <button
              className={cn('btn btn-link text-start w-100', {
                active: activeChannelId === channel.id,
                'fw-bold': activeChannelId === channel.id,
                'text-decoration-underline': activeChannelId === channel.id,
              })}
              onClick={() => handleChannelClick(channel.id)}
            >
              # {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;