import axios from 'axios';

const token = window.localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': true,
  },
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return configInstance;
});

export default instance;
