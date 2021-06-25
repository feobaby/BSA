import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'https://bsa-backend.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': true,
  },
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  config.headers.Authorization = `Bearer ${token}`;
  return configInstance;
});

export default instance;
