import axios from 'axios';
import { setActiveChannelId } from '../store/slices/channelsSlice.js';

const api = axios.create({
  baseURL: '/api/v1',
});

const request = async (method, url, token, data = null) => {
  const response = await api({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getChannels = (token) => request('get', '/channels', token);

const addChannelApi = async (newChannel, token, dispatch) => {
  const channel = await request('post', '/channels', token, newChannel);
  dispatch(setActiveChannelId(channel.id));
};

const updateChannelApi = (channelId, updatedChannel, token) => {
  request('patch', `/channels/${channelId}`, token, updatedChannel);
};

const deleteChannelApi = (channelId, token) => {
  request('delete', `/channels/${channelId}`, token);
};

export {
  getChannels,
  addChannelApi,
  updateChannelApi,
  deleteChannelApi,
};
