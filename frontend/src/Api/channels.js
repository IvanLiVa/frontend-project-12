import axios from 'axios';

const api = axios.create({});

const getChannels = async (token) => {
  const response = await api.get('/api/v1/channels', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default getChannels;
