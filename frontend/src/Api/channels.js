import axios from 'axios';
import { setActiveChannelId } from '../store/slices/channelsSlice.js';

const api = axios.create({
  baseURL: '/api/v1',
});

const request = async (method, url, data = null, token) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка при ${method} запроса на ${url}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const getChannels = (token) => request('get', '/channels', null, token);

const addChannelApi = async (newChannel, token, dispatch) => {
  const channel = await request('post', '/channels', newChannel, token);
  dispatch(setActiveChannelId(channel.id));
};

const updateChannelApi = (channelId, updatedChannel, token) =>
  request('patch', `/channels/${channelId}`, updatedChannel, token);

const deleteChannelApi = (channelId, token) =>
  request('delete', `/channels/${channelId}`, null, token);

export { getChannels, addChannelApi, updateChannelApi, deleteChannelApi };
