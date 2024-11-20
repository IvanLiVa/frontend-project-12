import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels } from '../../store/slices/channelsSlice.js';
import getChannels from '../../Api/channels.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      getChannels(token)
        .then((data) => {
          dispatch(setChannels(data));
        })
        .catch((error) => console.error('Ошибка загрузки каналов:', error));
    }
  }, []);

  return (
    <div className="col-2 bg-light p-3 border-end">
      <b>Каналы</b>
      <ul className="nav flex-column">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item">
            <button className="btn btn-link text-start w-100">
              # {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
