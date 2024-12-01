import axios from 'axios';

const fetchDataLogin = async (login, password) => {
  const response = await axios.post('/api/v1/login', {
    username: login,
    password,
  });
  return response.data;
};

const addUser = async (username, password) => {
  try {
    const response = await axios.post('/api/v1/signup', {
      username,
      password,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error('Пользователь с таким логином уже существует.');
    }
    throw new Error('Ошибка при создании пользователя.');
  }
};
export { fetchDataLogin, addUser };
