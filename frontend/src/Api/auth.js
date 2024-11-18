import axios from 'axios';

const fetchDataLogin = async (login, password) => {
  const response = await axios.post('/api/v1/login', {
    username: login,
    password,
  });
  return response.data;
};

export default fetchDataLogin;
