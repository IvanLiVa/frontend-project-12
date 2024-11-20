import axios from 'axios';

const api = axios.create({});

const getMessages = async (token) => {
  const response = await api.get('/api/v1/messages', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Ответ от сервера:', response.data);
  return response.data;
};

export default getMessages;
