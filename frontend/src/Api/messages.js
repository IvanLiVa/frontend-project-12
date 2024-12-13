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

const sendMessage = async (messageText, channelId, username, token) => {
  const message = {
    body: messageText,
    channelId,
    username,
  };

  try {
    return await addMessageApi(message, token);
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error.message);
    return null;
  }
};

export { getMessages, sendMessage };
