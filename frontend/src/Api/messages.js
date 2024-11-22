import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

const getMessages = async (token) => {
  const response = await api.get('/messages', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const addMessageApi = async (message, token) => {
  const response = await api.post('/messages', message, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { getMessages, addMessageApi };
